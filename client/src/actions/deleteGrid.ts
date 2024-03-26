// deleteGrid.ts
'use server';

import { MongoClient, UpdateResult } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function deleteGrid(courseID: string, gridIndex: number): Promise<{ success: boolean; weeksCount: number }> {
    let { userId } = auth();
    let _id: string = userId!;

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const user = await accountsCollection.findOne({ _id: _id, "courses.courseID": courseID });
        const course = user?.courses?.find(course => course.courseID === courseID);
        if (!course || !course.grids) throw new Error("Grid not found");

        const grid = course.grids[gridIndex];
        if (!grid) throw new Error("Grid not found");
        // Use optional chaining with a default array to avoid "possibly 'undefined'" error
        const weeksCount = grid.weeks?.length ?? 0;

        const updateResult: UpdateResult = await accountsCollection.updateOne(
            { _id: _id, "courses.courseID": courseID },
            { $pull: { "courses.$.grids": { gridName: grid.gridName } } } // Assuming gridName is unique within the course
        );

        return { success: updateResult.modifiedCount === 1, weeksCount };

    } catch (error) {
        console.error('Error deleting the grid: ', error);
        return { success: false, weeksCount: 0 };
    } finally {
        mongoClient.close();
    }
}
