'use server';

import { User, Grid } from '@/tools/data.model';
import { auth } from '@clerk/nextjs';
import { MongoClient } from "mongodb";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function thisCourseGrids(courseID: string): Promise<Grid[] | undefined> {
    let { userId } = auth();

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Keeping the projection as you requested.
        const projection = {
            courses: {
                $elemMatch: { courseID: courseID }
            }
        };

        const userInfo = await accountsCollection.findOne({ _id: userId! }, { projection });

        if (userInfo && userInfo.courses && userInfo.courses.length > 0 && userInfo.courses[0].grids) {
            // Filtering out archived grids directly after fetching, within the JavaScript code.
            const grids = userInfo.courses[0].grids.filter(grid => !grid.archived);

            return grids;
        } else {
            console.log("Course or grids not found.");
            return [];
        }

    } catch (error) {
        console.error("Error fetching course grids", error);
        throw error; // It's generally a good idea to throw the error so the calling function can handle it.
    } finally {
        await mongoClient.close();
    }
}
