// archiveGridWeeks.ts
'use server';

import { MongoClient } from "mongodb";
import { User, Grid } from "@/tools/data.model";
import { auth } from '@clerk/nextjs';

const MONGO_URL: string = process.env.MONGO_URL || "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function archivedGridWeeks(courseID: string, gridIndex: number): Promise<Grid | null> {
  const userId = auth().userId;
  if (!userId) {
    console.log("User ID is null");
    return null;
  }

  try {
    await mongoClient.connect();
    const db = mongoClient.db(MONGO_DB_NAME);
    const collection = db.collection<User>(MONGO_COLLECTION_ACCOUNT);

    const userDoc = await collection.findOne({ _id: userId });
    // Ensure courses and grids exist and are not undefined before proceeding.
    if (!userDoc || !userDoc.courses) {
      console.log("Courses not found.");
      return null;
    }

    const course = userDoc.courses.find(course => course.courseID === courseID);
    if (!course || !course.grids || course.grids.length <= gridIndex) {
      console.log("Grid not found or it has no weeks.");
      return null;
    }

    const grid = course.grids[gridIndex];
    // Ensure the grid is archived before returning it.
    if (!grid || grid.archived !== true) {
      console.log("Archived grid not found.");
      return null;
    }

    return grid;
  } catch (error) {
    console.error("Failed to fetch archived grid weeks:", error);
    return null;
  } finally {
    await mongoClient.close();
  }
}
