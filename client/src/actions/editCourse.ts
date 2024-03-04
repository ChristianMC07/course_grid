import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
import { sanitize } from "sanitize-html";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function editCourse(courseID: string, courseData: any) {
    // Connect to the database
    await mongoClient.connect();
    const db = mongoClient.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_COLLECTION_ACCOUNT);

    // Extract and sanitize data
    const sanitizedCourseName = sanitize(courseData.courseName);
    const sanitizedCourseDescription = sanitize(courseData.courseDescription);
    // Handle coursePhoto as needed

    // Update the course in the database
    try {
        const result = await collection.updateOne(
            { "courses.courseID": courseID },
            {
                $set: {
                    "courses.$.courseName": sanitizedCourseName,
                    "courses.$.courseDescription": sanitizedCourseDescription,
                    // Update coursePhoto if necessary
                }
            }
        );

        if (result.modifiedCount === 0) {
            throw new Error('Course not updated');
        }

        // Return success response (handle redirection in client-side)
        return { success: true };
    } catch (error: unknown) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            console.error('Error updating course:', error.message);
            // Return error response with the message property
            return { success: false, error: error.message };
        } else {
            console.error('An unexpected error occurred');
            // Return a generic error response
            return { success: false, error: 'An unexpected error occurred' };
        }
    } finally {
        await mongoClient.close();
    }
}