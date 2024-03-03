'use server'

import { User } from "@/tools/data.model";
import { MongoClient } from "mongodb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import sanitize from "sanitize-html";
import { error } from "console";
import { createSearchParamsBailoutProxy } from "next/dist/client/components/searchparams-bailout-proxy";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

type ErrorMessage = {
    [key: string]: any;
}

let mongoClient: MongoClient = new MongoClient(MONGO_URL);

export async function createGrid(formState: ErrorMessage, formData: FormData) {

    let { userId } = auth();
    console.log(userId);

    let errorMessages: ErrorMessage = {
        gridNameError: '',
        weeksError: '',
    }

    let _id: string = userId!;
    let gridName: any = formData.get('gridName');
    let weeks: any = formData.get('weeks');
    let courseID: string = formData.get('courseID') as string;

    console.log(_id, gridName, weeks, courseID);
    console.log(typeof (_id), typeof (gridName), typeof (weeks), typeof (courseID));

    if (gridName.length == 0) {
        errorMessages.gridNameError = 'Please provide a valid Grid Name';
    } else {
        gridName = sanitize(gridName);
    }

    if (parseInt(weeks) < 0) {
        errorMessages.weeksError = `Weeks can't be negative. Valid number is between 0 and 16 inclusive`
    } else if (parseInt(weeks) > 16) {
        errorMessages.weeksError = `Weeks can't be higher than 16`
    } else {
        weeks = sanitize(weeks);
    }

    console.log(errorMessages);

    if (Object.values(errorMessages).join('') === '') {
        try {
            await mongoClient.connect();

            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);

            const doc = await accountsCollection.findOne({ _id: _id });

            console.log(doc);

        } catch {

        } finally {

        }
    } else {
        return errorMessages;
    }





}