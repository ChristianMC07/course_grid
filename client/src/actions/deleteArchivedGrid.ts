// deleteArchivedGrid.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs'; // or your authentication method
import { User } from "@/tools/data.model";

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function deleteArchivedGrid(courseID: string, gridIndex: number): Promise<boolean> {
    const { userId } = auth();
    if (!userId) {
        console.error("User ID is not available.");
        return false;
    }

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Update the course document to remove the specified grid from the 'grids' array
        const updateResult = await accountsCollection.updateOne(
            { _id: userId, "courses.courseID": courseID },
            { $pull: { "courses.$.grids": { index: gridIndex, archived: true } } } // Ensure this matches your data model correctly
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error('Error deleting the archived grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
