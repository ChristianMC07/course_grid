'use server'

import { MongoClient } from "mongodb"
import { redirect } from "next/navigation";

import { writeFile } from "fs/promises";
import { join } from "path";
import sanitize from "sanitize-html";
import { fileURLToPath } from "url";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

type ErrorMessage = { [key: string]: string };

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createCourse(formState: { errorMessages: ErrorMessage[] }, formData: FormData) {

    let errorMessages: ErrorMessage[] = [];

    let _id: string = formData.get('userID') as string;
    let courseID: any = formData.get('courseCode');
    let courseName: any = formData.get('courseName');
    let courseDescription: any = formData.get('courseDescription');
    let coursePhoto: File | null = formData.get('coursePhoto') as unknown as File;

    let coursePhotoName: string | null = coursePhoto.name;

    if (!coursePhoto) {
        errorMessages.push({ 'imageError': 'No image uploaded' });
    } else {
        const bytes = await coursePhoto.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join('/', 'tmp', coursePhotoName);

        await writeFile(path, buffer);

        console.log(`open ${path} to see the uploaded file`);

        coursePhotoName = sanitize(coursePhotoName);
    }

    if (typeof courseID !== 'string' || courseID.length == 0) {
        errorMessages.push({ 'courseIDError': "Please provide a valid Course Code" })
    } else {
        courseID = sanitize(courseID);
    }

    if (typeof courseName !== 'string' || courseName.length == 0) {
        errorMessages.push({ 'courseNameError': "Please provide a valid Course Name" })
    } else {
        courseName = sanitize(courseName);
    }

    if (typeof courseDescription !== 'string' || courseDescription.length == 0) {
        errorMessages.push({ 'courseDescriptionError': "Please provide a valid Course Description" })
    } else {
        courseDescription = sanitize(courseDescription);
    }
}