'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User, Grid } from "@/tools/data.model";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function fetchGrid(courseID: string, gridIndex: number): Promise<Grid | null> {
    const { userId } = auth();

    // Ensure userId is not null and is a string before proceeding.
    if (typeof userId !== 'string') {
        console.error('User ID is null or not a string');
        return null;
    }

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Use userId directly without converting to ObjectId, as MongoDB handles this automatically.
        const userInfo = await accountsCollection.findOne({ _id: userId });

        // Now proceed with finding the course and grid as before.
        const course = userInfo?.courses?.find(course => course.courseID === courseID);
        if (!course || !course.grids || course.grids.length <= gridIndex) {
            console.error('Course or grid not found');
            return null;
        }

        return course.grids[gridIndex];
    } catch (error) {
        console.error('Error fetching grid:', error);
        return null;
    } finally {
        await mongoClient.close();
    }
}
