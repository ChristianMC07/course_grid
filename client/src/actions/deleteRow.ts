'use server'

import { User, Grid, Week, Row } from "@/tools/data.model";
import { MongoClient, UpdateResult } from "mongodb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

let mongoClient: MongoClient = new MongoClient(MONGO_URL);