'use server'

import { MongoClient, UpdateResult } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function deleteCourse(courseID: string) {
    let { userId } = auth();
    let _id: string = userId!;

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const updateResult: UpdateResult = await accountsCollection.updateOne(
            { _id: _id },
            { $pull: { courses: { courseID: courseID } } }
        );

        return updateResult.modifiedCount === 1;

    } catch (error) {
        console.error('Error deleting the course: ', error);
        return false;
    } finally {
        mongoClient.close();
    }
}
