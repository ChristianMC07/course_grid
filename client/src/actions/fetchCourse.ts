// fetchCourse.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs'; // Import auth system to get user ID
import { User } from "@/tools/data.model";

const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function fetchCourse(courseID: string) {
  let { userId } = auth(); // Retrieve user ID from auth system

  // Ensure userId is not null and is a string
  if (typeof userId !== 'string') {
    console.error('User ID is null or not a string');
    return null;
  }

  try {
    await mongoClient.connect();
    const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);
    const userInfo = await accountsCollection.findOne({ _id: userId });
    return userInfo?.courses?.find(course => course.courseID === courseID) || null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  } finally {
    await mongoClient.close();
  }
}
