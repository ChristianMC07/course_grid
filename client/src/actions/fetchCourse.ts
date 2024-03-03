'use server';

import { MongoClient } from "mongodb";
import { User } from "@/tools/data.model";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function fetchCourse(courseID: string) {
    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const user = await accountsCollection.findOne({ "courses.courseID": courseID }, { projection: { "courses.$": 1 } });

        return user?.courses?.[0] || null;
    } catch (error) {
        console.error('Error while fetching course:', error);
        throw error; 
    } finally {
        await mongoClient.close();
    }
}
