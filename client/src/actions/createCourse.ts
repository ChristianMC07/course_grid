'use server'

import { MongoClient } from "mongodb"
import { redirect } from "next/navigation";

import { writeFile } from "fs/promises";
import { join } from "path";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createCourse(formState: { errorMessages: string[] }, formData: FormData) {

    const errorMessages: string[] = [];

    const _id: any = formData.get('userID');
    const courseID: any = formData.get('courseCode');
    const courseName: any = formData.get('courseName');
    const courseDescription: any = formData.get('courseDescription');
    const coursePhoto: File | null = formData.get('coursePhoto') as unknown as File;

    if (!coursePhoto) {
        errorMessages.push('No image uploaded');
    }

}