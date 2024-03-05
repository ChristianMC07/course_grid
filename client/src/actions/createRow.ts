'use server'

import { User, Grid, Week, Row } from "@/tools/data.model";
import { MongoClient, UpdateResult } from "mongodb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import sanitize from "sanitize-html";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

type ErrorMessage = {
    [key: string]: any;
}

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createRow(formState: ErrorMessage, formData: FormData) {
    let { userId } = auth();

    let errorMessages: ErrorMessage = {
        classIDError: '',
        learningOutcomeError: '',
        enablingOutcome: '',
        materialError: '',
        assessment: '',
        notesError: '',
    }

    let _id: string = userId!;
    let courseID: string = formData.get('courseID') as string;
    let gridName: string = formData.get('gridName') as string;
    let weekName: string = formData.get('weekName') as string;

    let courseIndex = findCourseIndex(_id, courseID);


    let classID: any = formData.get('classID');
    let learningOutcome: any = formData.get('learningOutcome');
    let enablingOutcome: any = formData.get('enablingOutcome');
    let material: any = formData.get('material');
    let assessment: any = formData.get('assessment');
    let notes: any = formData.get('notes');

    if (classID.length > 10) {
        errorMessages.classIDError = `Class ID max characters = 10`
    } else {
        classID = sanitize(classID);
    }

    if (learningOutcome.length > 255) {
        errorMessages.learningOutcomeError = `Learning Outcome max characters = 255`
    } else {
        learningOutcome = sanitize(learningOutcome);
    }

    if (enablingOutcome.length > 255) {
        errorMessages.enablingOutcomeError = `Enabling Outcome max characters = 255`
    } else {
        enablingOutcome = sanitize(enablingOutcome);
    }

    if (material.length > 255) {
        errorMessages.materialError = `Material max characters = 255`
    } else {
        material = sanitize(material);
    }

    if (assessment.length > 255) {
        errorMessages.assessmentError = `Assessment max characters = 255`
    } else {
        assessment = sanitize(material);
    }

    if (notes.length > 255) {
        errorMessages.notesError = `Notes max characters = 255`
    } else {
        notes = sanitize(notes);
    }


    if (Object.values(errorMessages).join('') === '') {
        try {
            await mongoClient.connect();
            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

            // New row data from formData
            const newRow = {
                classID: formData.get('classID'),
                learningOutcome: formData.get('learningOutcome'),
                enablingOutcome: formData.get('enablingOutcome'),
                material: formData.get('material'),
                assessment: formData.get('assessment'),
                notes: formData.get('notes'),
            };

            const updateResult: UpdateResult = await accountsCollection.updateOne(
                { _id: _id, "courses.courseID": courseID, "courses.grids.gridName": gridName, "courses.grids.weeks.weekName": weekName },
                { $push: { "courses.$.grids.$.weeks.$.rows": newRow } }
            );

            updateResult.modifiedCount === 1 ? console.log("The row was added") : console.log('No luck');

        }
        catch (error) {
            console.log('This is the error and will appear in the server : ' + error)

        }
        finally {
            await mongoClient.close();

        }
    } else {
        return errorMessages;
    }




}

async function findCourseIndex(userId: string, courseID: string) {

    try {

        await mongoClient.connect();


        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

        const userDocument = await accountsCollection.findOne({ _id: userId })

        let courseIndex = -1;
        if (userDocument && userDocument.courses) {
            courseIndex = userDocument.courses.findIndex(course => course.courseID === courseID);
        }

        return courseIndex;

    } finally {

        await mongoClient.close();
    }


}