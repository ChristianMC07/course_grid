'use server'

import { User, Grid } from '@/tools/data.model';
import { auth } from '@clerk/nextjs';

import { MongoClient } from "mongodb"

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function gridWeeks(codeID: string, index: string) {

    let { userId } = auth();

    try {
        mongoClient.connect();

        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const projection = {
            courses: {
                $elemMatch: { courseID: codeID }
            }
        }

        const userInfo = await accountsCollection.findOne({ _id: userId! }, { projection });

        console.log(userInfo);

        if (userInfo && userInfo.courses && userInfo.courses.length > 0) {
            const grids = userInfo.courses[0].grids![parseInt(index)];
            console.log(grids);
            return grids;

        }
        else {
            console.log("Course or grids not found.");
            return [];
        }

    } catch (error) {
        console.error("Error fetching course grids", error)
        throw error;
    }
    finally {
        // await mongoClient.close();

    }

}