// editGrid.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function editGrid(courseID: string, gridIndex: number, formData: FormData) {
    let { userId } = auth();
    // No need to convert to ObjectId here; use the string directly
    let _id: string = userId!;

    // Ensure formData.get('gridName') is treated as a string
    let gridName: string = formData.get('gridName') as string; // Cast to string

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Be cautious with the update syntax, especially when accessing arrays by index.
        // You might need a different approach if this doesn't work as expected.
        const updateResult = await accountsCollection.updateOne(
            { _id, "courses.courseID": courseID },
            { 
                $set: { 
                    [`courses.$.grids.${gridIndex}.gridName`]: gridName
                    // Add other grid properties to update here
                }
            }
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error('Error updating the grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
