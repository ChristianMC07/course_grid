'use server';

import { MongoClient } from "mongodb";
import sanitize from "sanitize-html";
import { auth } from '@clerk/nextjs';
import { User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function editCourse(courseID: string, formData: FormData) {
    let { userId } = auth();
    let _id: string = userId!;

    // Extract and sanitize data from formData
    let courseName: string = sanitize(formData.get('courseName') as string);
    let courseDescription: string = sanitize(formData.get('courseDescription') as string);
    let coursePhoto: string = sanitize(formData.get('coursePhoto') as string);  // Assuming this is a photo URL

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        // Update the specific course
        const updateResult = await accountsCollection.updateOne(
            { _id: _id, "courses.courseID": courseID },
            {
                $set: {
                    "courses.$.courseName": courseName,
                    "courses.$.courseDescription": courseDescription,
                    "courses.$.coursePhoto": coursePhoto
                }
            }
        );

        // Log the updated course (for debugging)
        if (updateResult.modifiedCount === 1) {
            const updatedUserInfo = await accountsCollection.findOne({ _id: _id });
            const updatedCourse = updatedUserInfo?.courses?.find(course => course.courseID === courseID);
            console.log("Updated course data:", updatedCourse);
        }

        return updateResult.modifiedCount === 1;

    } catch (error) {
        console.error('Error updating the course: ', error);
        return false;
    } finally {
        mongoClient.close();
    }
}
