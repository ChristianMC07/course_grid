'use server'

import { InsertOneResult, MongoClient, UpdateResult } from "mongodb"
import { redirect } from "next/navigation";
import sanitize from "sanitize-html";
import { auth } from '@clerk/nextjs';
import { createImage } from '@/tools/Toolkit';
import { Accounts, User } from "@/tools/data.model";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

type ErrorMessage = {
    [key: string]: any;
};



let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createCourse(formState: ErrorMessage, formData: FormData) {


    let { userId } = auth();
    console.log(userId);

    let errorMessages: ErrorMessage = {
        courseIDError: '',
        courseNameError: '',
        courseDescriptionError: '',
        coursePhotoError: '',
    }

    let _id: string = userId!;
    let courseID: any = formData.get('courseID');
    let courseName: any = formData.get('courseName');
    let courseDescription: any = formData.get('courseDescription');
    let coursePhoto: File | null = formData.get('coursePhoto') as unknown as File;

    let coursePhotoName: string | null = coursePhoto.name;

    if (typeof courseID !== 'string' || courseID.length == 0) {
        errorMessages.courseIDError = 'Please provide a valid Course Code';
    } else {
        courseID = sanitize(courseID);
    }

    if (typeof courseName !== 'string' || courseName.length == 0) {
        errorMessages.courseNameError = 'Please provide a valid Course Name';
    } else {
        courseName = sanitize(courseName);
    }

    if (typeof courseDescription !== 'string' || courseDescription.length == 0) {
        errorMessages.courseDescriptionError = 'Please provide a valid Course Description';
    } else {
        courseDescription = sanitize(courseDescription);
    }

    if (!coursePhoto || coursePhotoName == undefined) {
        errorMessages.coursePhotoError = 'No image uploaded';

    } else {
        coursePhotoName = sanitize(coursePhoto.name);
    }

    if (Object.values(errorMessages).join('') === '') {
        createImage(coursePhoto);


        try {

            await mongoClient.connect();

            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

            const doc = await accountsCollection.findOne({ _id: _id })

            const courseExist = await accountsCollection.findOne({ courses: { $elemMatch: { 'courseID': courseID } } });

            if (doc == null) {
                let result: InsertOneResult = await accountsCollection.insertOne({
                    _id: _id,
                    courses: [
                        {
                            courseID: courseID,
                            courseName: courseName,
                            courseDescription: courseDescription,
                            coursePhoto: coursePhotoName,
                        }

                    ]

                });

            } else if (doc !== null && courseExist === null) {
                //The document exist (user), but the course doesn't. Create a new course

                const updateResult = await accountsCollection.updateOne(
                    { _id: _id },
                    {
                        $push: {
                            courses: {
                                courseID: courseID,
                                courseName: courseName,
                                courseDescription: courseDescription,
                                coursePhoto: coursePhotoName,
                            }
                        }
                    }
                );

            } else if (doc !== null && courseExist != null) {
                // The document and the course both exist - update the existing course
                const updateResult = await accountsCollection.updateOne(
                    { _id: _id, "courses.courseID": courseID },
                    {
                        $set: {
                            "courses.$.courseName": courseName,
                            "courses.$.courseDescription": courseDescription,
                            "courses.$.coursePhoto": coursePhotoName,
                        }
                    }
                );

                updateResult.modifiedCount === 1 ? console.log("The course was added") : console.log('No luck');
            }



        } catch (error) {
            console.log('This is the error and will appear in the server : ' + error)

        } finally {

            mongoClient.close();
        }

        redirect('/home/courses/');


    } else {
        return errorMessages;
    }



}