'use server';

import { Accounts } from "./data.model";
import { Collection, InsertOneResult, MongoClient } from "mongodb";
import sanitizeHtml from 'sanitize-html';

import { redirect } from "next/navigation";

import { hashPasswordBack } from "./DataManager";
import { error } from "console";

// MongoDB constants
const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";


let mongoClient: MongoClient = new MongoClient(MONGO_URL);


export async function createNewUser(formState: { message: string | null }, formData: FormData) {


    const password = sanitizeHtml(formData.get('password') as string);
    const lastName = sanitizeHtml(formData.get('lastName') as string);
    const firstName = sanitizeHtml(formData.get('firstName') as string);
    const email = sanitizeHtml(formData.get('email') as string);
    const validatePass = sanitizeHtml(formData.get('validatePass') as string);

    if (validatePass === password) {
        // const hashedPassword = await hashPasswordBack(password);

        try {

            await mongoClient.connect();

            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<Accounts>(MONGO_COLLECTION_ACCOUNT);

            let result: InsertOneResult = await accountsCollection.insertOne({
                _id: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            });
        } catch (error: any) {
            console.error("Error in creating your account", error.message);
            throw error;
        } finally {
            await mongoClient.close();
        }

        redirect('/');

    } else {
        return { message: "Passwords don't match" };
    }

}

export async function loginUser(formState: { emailMessage?: string, passMessage?: string, feedback?: string }, formData: FormData) {
    //Steps

    //get user and password from the FORM

    let email: any = formData.get('email');
    let password: any = formData.get('password');

    //validate if inputs are valid

    // provide messages if not true
    if ((typeof email !== 'string' || email.length == 0) && (typeof password !== 'string' || password.length == 0)) {

        return { emailMessage: "Email field can't be empty", passMessage: "Password field can't be empty" };
    } else if (typeof email !== 'string' || email.length == 0) {
        return { emailMessage: "Email field can't be empty" };
    } else if (typeof password !== 'string' || password.length == 0) {
        return { passMessage: " Password field can't be empty" };
    } else {
        // both email and passwords are valid in terms of datatype and length
        //sanitize if true

        let validEmail: string = sanitizeHtml(email);
        let validPass: string = sanitizeHtml(password);

        //connect to the DB

        //try block with functionality

        try {
            await mongoClient.connect();

            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<Accounts>(MONGO_COLLECTION_ACCOUNT);

            //since the user is the _id, we will need to check if password from associated user in the DB matches the one provided in the form

            const account = await accountsCollection.findOne({ _id: validEmail });

            console.log(account);

            //feedback if account doesn't exist

            if (!account) {
                return { feedback: "Your account doesn't exist" }
            }

            //if password in DB matches provided password, then redirect to user's homepage

            if (account.password === validPass) {
                redirect(`/home/${account._id}`);
            } else {
                return { feedback: "Invalid user or password" }
            }

        } catch (error: any) {
            console.error();
            throw error;

        } finally {
            await mongoClient.close();
        }

    }

}

export async function getUserInfo(userID: string): Promise<Accounts> {

    await new Promise((r) => setTimeout(r, 2000));

    let account: Accounts;
    console.log(userID);

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<Accounts>(MONGO_COLLECTION_ACCOUNT);
        account = await accountsCollection.findOne({ _id: userID }) as Accounts;

        return account;

    } catch {
        console.error('An error ocurred', error);
        throw new Error('Failed to fetch user info');

    } finally {
        await mongoClient.close();

    }

}