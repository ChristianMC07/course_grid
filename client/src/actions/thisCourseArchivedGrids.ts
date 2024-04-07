// thisCourseArchivedGrids.ts
'use server';

import { MongoClient } from "mongodb";
import { User, Grid } from "@/tools/data.model";
import { auth } from '@clerk/nextjs';

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function thisCourseArchivedGrids(courseID: string): Promise<Grid[] | undefined> {
    let { userId } = auth();
    if (!userId) {
        console.error('User ID is not available');
        return undefined;
    }

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Fetch the user document based on the user's ID
        const userDoc = await accountsCollection.findOne({ _id: userId });

        if (!userDoc || !userDoc.courses) {
            console.error('User document or courses not found.');
            return undefined;
        }

        // Find the course by the provided courseID
        const course = userDoc.courses.find(course => course.courseID === courseID);
        if (!course || !course.grids) {
            console.error('Course or grids not found.');
            return undefined;
        }

        // Filter the grids to only include those that are archived
        const archivedGrids = course.grids.filter(grid => grid.archived === true);
        
        return archivedGrids;

    } catch (error) {
        console.error("Error fetching archived grids: ", error);
        return undefined;
    } finally {
        await mongoClient.close();
    }
}
