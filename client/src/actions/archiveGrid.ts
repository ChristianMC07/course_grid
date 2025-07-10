// archiveGrid.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function archiveGrid(courseID: string, gridIndex: number): Promise<boolean> {
    const { userId } = auth();
    if (!userId) {
        console.error("User ID is not available.");
        return false;
    }

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const result = await accountsCollection.updateOne(
            { _id: userId, "courses.courseID": courseID },
            {
                $set: {
                    [`courses.$.grids.${gridIndex}.archived`]: true,
                    [`courses.$.grids.${gridIndex}.archivedAt`]: new Date() // Add this line
                }
            }
        );

        return result.modifiedCount === 1;
    } catch (error) {
        console.error('Error archiving the grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}