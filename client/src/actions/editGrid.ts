'use server';

import { MongoClient } from "mongodb";
import { auth } from "@clerk/nextjs";
import { User } from "@/tools/data.model";
import sanitize from "sanitize-html";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function editGrid(gridID: string, formData: FormData) {
    const { userId } = auth();
    const _id = userId!;

    // Extract and sanitize data from formData
    const gridName = sanitize(formData.get('gridName') as string);
    const weeks = formData.get('weeks') ? parseInt(sanitize(formData.get('weeks') as string)) : null; // Handle weeks as needed

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Assuming grids are stored in a subdocument of courses
        const updateResult = await accountsCollection.updateOne(
            { _id, "courses.grids._id": gridID },
            { 
                $set: {
                    "courses.$.grids.$.gridName": gridName,
                    ...(weeks && {"courses.$.grids.$.weeks": weeks}), // Conditional update
                }
            }
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error('Error updating grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
