'use server'

import { User } from '@/tools/data.model';
import { auth } from '@clerk/nextjs';

import { MongoClient } from "mongodb"

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function thisUserCourses() {
    let { userId } = auth();

    try {
        await mongoClient.connect();

        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const userInfo = await accountsCollection.findOne({ _id: userId! });


        return userInfo;


    } catch (error) {
        console.log('This error is when fetchig the courses from the user ' + error)

    } finally {

        await mongoClient.close();

    }
}