// archiveGrid.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function archiveGrid(courseID: string, gridIndex: number): Promise<boolean> {
    const { userId } = auth();
    const _id: string = userId!;

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const result = await accountsCollection.updateOne(
            { _id, "courses.courseID": courseID },
            { $set: { [`courses.$.grids.${gridIndex}.archived`]: true } }
        );

        return result.modifiedCount === 1;
    } catch (error) {
        console.error('Error archiving the grid: ', error);
        return false;
    } finally {
        await mongoClient.close();
    }
}
