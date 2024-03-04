'use server'

import { User } from '@/tools/data.model';
import { auth } from '@clerk/nextjs';
import { MongoClient } from "mongodb"

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);


export async function thisCourseGrids(courseID: string) {
    let { userId } = auth();

    try {
        await mongoClient.connect();

        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const projection = {
            courses: {
                $elemMatch: { courseID: courseID },
            }
        }

        const userGrids = await accountsCollection.findOne({ _id: userId! });



    } catch {

    }
    finally {

    }

}