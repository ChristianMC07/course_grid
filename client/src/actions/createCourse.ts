'use server'

import { MongoClient } from "mongodb"

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);