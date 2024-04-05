// actions/duplicateGrid.ts
import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User, Grid } from "@/tools/data.model";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function duplicateGrid(courseID: string, gridIndex: number): Promise<boolean> {
    const { userId } = auth();
    if (!userId) {
        console.error("User ID is not available.");
        return false;
    }

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const userDoc = await accountsCollection.findOne({ _id: userId });
        if (!userDoc || !userDoc.courses) {
            console.error('User document or courses not found.');
            return false;
        }

        const course = userDoc.courses.find(course => course.courseID === courseID);
        if (!course || !course.grids || course.grids.length <= gridIndex) {
            console.error('Course or grid not found.');
            return false;
        }

        const gridToDuplicate = course.grids[gridIndex];
        const duplicatedGrid: Grid = {
            ...gridToDuplicate,
            gridName: `${gridToDuplicate.gridName} - Copy`
            
        };

        // Push the duplicated grid to the database
        const updateResult = await accountsCollection.updateOne(
            { _id: userId, "courses.courseID": courseID },
            { $push: { "courses.$.grids": duplicatedGrid } }
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error('Error duplicating the grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
