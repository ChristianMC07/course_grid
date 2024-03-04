'use server'

import { User, Grid } from '@/tools/data.model';
import { auth } from '@clerk/nextjs';
import { MongoClient } from "mongodb"

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);


export async function thisCourseGrids(courseID: string): Promise<Grid[] | undefined> {
    let { userId } = auth();

    try {
        await mongoClient.connect();

        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const projection = {
            courses: {
                $elemMatch: { courseID: courseID },
            }
        }

        const userInfo = await accountsCollection.findOne({ _id: userId! }, { projection: projection });

        console.log(userInfo);

        if (userInfo && userInfo.courses && userInfo.courses.length > 0) {
            const grids = userInfo.courses[0].grids;
            return grids;

        } else {
            console.log("Course or grids not found.");
            return [];
        }

    } catch {

    }
    finally {

    }

}