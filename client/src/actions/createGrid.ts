'use server'

import { User } from "@/tools/data.model";
import { MongoClient } from "mongodb";
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

export async function createGrid(formState: ErrorMessage, formData: FormData, id: string) {

    let { userId } = auth();
    console.log(userId);

    let errorMessages: ErrorMessage = {
        gridNameError: '',
        weeksError: '',
    }

    let _id: string = userId!;
    let gridName: any = formData.get('gridName');
    let weeks: any = formData.get('weeks');

}