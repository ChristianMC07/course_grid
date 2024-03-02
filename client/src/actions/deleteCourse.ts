'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs'; 
import { User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

export async function deleteCourse(courseId: string) {
    // Initially set client to null to satisfy TypeScript's strict null checks
    let client: MongoClient | null = null;
    
    try {
        // Correctly instantiate the MongoClient and connect
        client = new MongoClient(MONGO_URL);
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const accountsCollection = db.collection<User>(MONGO_COLLECTION_ACCOUNT);

        const { userId } = await auth();
        if (!userId) {
            console.log("User is not authenticated.");
            return { error: "User is not authenticated." };
        }

        // Attempt to delete the course from the user's document
        const result = await accountsCollection.updateOne(
            { _id: userId },
            { $pull: { courses: { courseID: courseId } } }
        );

        if (result.modifiedCount === 0) {
            console.log("Course not found or user not authorized to delete this course.");
            return { error: "Course not found or user not authorized to delete this course." };
        }

        console.log("Course deleted successfully.");
        return { success: true };
    } catch (error) {
        console.error("An error occurred while deleting the course:", error);
        return { error: "An error occurred while deleting the course." };
    } finally {
        // Only attempt to close the client if it's not null
        if (client) {
            await client.close();
        }
    }
}
