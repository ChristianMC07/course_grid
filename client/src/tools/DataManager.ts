import { Accounts } from "./data.model";
import { Collection, InsertOneResult, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';
import bcryptjs from 'bcryptjs';
import { redirect } from "next/navigation";

// MongoDB constants
const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

// const MONGODB_URI="mongodb+srv://jamesmcdonald661:<password>@dbgrids.sdwqm9l.mongodb.net/?retryWrites=true&w=majority"

// Salt & Hash const's

const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single BCrypt hash.

export async function hashPasswordBack(password: string) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Hashing failed');
    }
}


export async function hashPasswordFront(password: string) {
    try {
        const salt = await bcryptjs.genSalt(saltRounds);
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Hashing failed');
    }
}

async function checkPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}

export async function createAccount(request: NextApiRequest, response: NextApiResponse<any>) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);
    try {
        await mongoClient.connect();

        // sanitizing input
        request.body.firstName = sanitizeHtml(request.body.firstName);
        request.body.lastName = sanitizeHtml(request.body.lastName);
        request.body.password = sanitizeHtml(request.body.password);
        request.body.email = sanitizeHtml(request.body.email);
        // Process accounts
        let accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<Accounts>(MONGO_COLLECTION_ACCOUNT);

        for (const account of request.body.accounts) {
            let sanitizedFirstName = sanitizeHtml(account.firstName);
            let sanitizedLastName = sanitizeHtml(account.lastName);
            let sanitizedPassword = await hashPasswordBack(account.password); // Hash the password here
            let sanitizedEmail = sanitizeHtml(account.email);
            let existingEmail = await accountsCollection.findOne({ _id: sanitizedEmail });

            if (!existingEmail) {
                await accountsCollection.insertOne({
                    _id: sanitizedEmail,
                    firstName: sanitizedFirstName,
                    lastName: sanitizedLastName,
                    password: sanitizedPassword,
                });
            }
        }
        // insert new document into DB
        let result: InsertOneResult = await mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_ACCOUNT).insertOne(request.body);

        response.status(200);
        response.send(result);

        redirect('/');

    } catch (error: any) {
        console.error();
        throw error;
    } finally {
        await mongoClient.close();
    }
}

export async function getAccount(username: string, password: string) {
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<Accounts>(MONGO_COLLECTION_ACCOUNT);

        // Find the user by username
        const account = await accountsCollection.findOne({ username });
        if (!account) {
            // User not found
            return null;
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await checkPassword(password, account.password);
        if (!isPasswordValid) {
            // Password does not match
            return null;
        }

        // Return the account (or specific account data) if login is successful
        return account;

    } catch (error: any) {
        console.error("Error in getAccount:", error.message);
        throw error;
    } finally {
        await mongoClient.close();
    }
}
