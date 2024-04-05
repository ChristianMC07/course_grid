'use server';

import { MongoClient } from "mongodb";
import { User, Grid } from "@/tools/data.model";
import { auth } from "@clerk/nextjs";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

// Utility function to generate a unique name for the duplicated grid
const generateUniqueName = (existingNames: string[], baseName: string): string => {
    let newName = baseName;
    let counter = 1;
    // Regular expression to identify if the name ends with a copy counter like " (1)"
    const copyRegex = /\s\((\d+)\)$/;

    // Extract the base name without the counter if it exists
    const match = baseName.match(copyRegex);
    if (match) {
        newName = baseName.replace(copyRegex, '');
        counter = parseInt(match[1], 10) + 1;
    }

    // Generate a new name with an incremented counter
    newName = `${newName} (${counter})`;

    // Check if this new name already exists, and if so, increment the counter until it is unique
    while (existingNames.includes(newName)) {
        newName = `${baseName} (${counter})`;
        counter += 1;
    }

    return newName;
};

export async function duplicateGrid(courseID: string, gridIndex: number): Promise<boolean> {
    const userId = auth().userId;
    if (!userId) {
        console.error("User ID is not available.");
        return false;
    }

    const mongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect();
        const collection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);
        
        const userDoc = await collection.findOne({ _id: userId });

        if (!userDoc || !userDoc.courses) {
            console.error("Courses not found for user.");
            return false;
        }

        const course = userDoc.courses.find(c => c.courseID === courseID);
        if (!course || !course.grids) {
            console.error("Grids not found in the course.");
            return false;
        }

        if (gridIndex >= course.grids.length) {
            console.error("Grid index out of bounds.");
            return false;
        }

        const gridToDuplicate = course.grids[gridIndex];
        const existingNames = course.grids.map(g => g.gridName);
        const newName = generateUniqueName(existingNames, gridToDuplicate.gridName);

        const newGrid: Omit<Grid, '_id'> = {
            ...gridToDuplicate,
            gridName: newName,
            archived: undefined,
            archivedAt: undefined,
        };

        const updateResult = await collection.updateOne(
            { _id: userId, "courses.courseID": courseID },
            { $push: { "courses.$.grids": newGrid } }
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error("Error duplicating grid:", error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
