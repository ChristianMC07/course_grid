'use server'

import { MongoClient } from "mongodb"
import { redirect } from "next/navigation";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createCourse(formState: { message: string | null }, formData: FormData) {

    const _id: any = formData.get('userID');
    const courseID: any = formData.get('courseCode');
    const courseName: any = formData.get('courseName');
    const courseDescription: any = formData.get('courseDescription');
    const coursePhoto: any = formData.get('courseDescription');

}