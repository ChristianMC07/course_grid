'use server';

import { MongoClient } from "mongodb";
import { auth } from "@clerk/nextjs";
import { User } from "@/tools/data.model";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function deleteGrid(gridID: string) {
    const { userId } = auth();
    const _id = userId!;

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const updateResult = await accountsCollection.updateOne(
            { _id },
            { $pull: { "courses.$.grids": { _id: gridID } } }
        );

        return updateResult.modifiedCount === 1;
    } catch (error) {
        console.error('Error deleting grid:', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
