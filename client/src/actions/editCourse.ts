import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
import { sanitize } from "sanitize-html";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

let mongoClient = new MongoClient(MONGO_URL);

export async function editCourse(courseID: string, formData: FormData) {
    // Connect to the database
    await mongoClient.connect();
    const db = mongoClient.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_COLLECTION_ACCOUNT);

    // Extract data from formData
    const courseName = formData.get('courseName') as string;
    const courseDescription = formData.get('courseDescription') as string;
    const coursePhoto = formData.get('coursePhoto') as File;

    // Sanitize input
    const sanitizedCourseName = sanitize(courseName);
    const sanitizedCourseDescription = sanitize(courseDescription);
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

        // Redirect or return success response
        redirect('/home/courses');
    } catch (error) {
        console.error('Error updating course:', error);
        // Handle error
    } finally {
        await mongoClient.close();
    }
}
