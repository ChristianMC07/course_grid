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

    let _id: string = formData.get('courseID') as string;
    let gridName: string = formData.get('gridName') as string;
    let weekName: string = formData.get('weekName') as string;


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

        }
        catch {

        }
        finally {
            await mongoClient.close();

        }



    } else {
        return errorMessages;
    }




}