// fetchGrid.ts
'use server';

import { MongoClient } from "mongodb";
import { auth } from '@clerk/nextjs';
import { User, Grid } from "@/tools/data.model";

const MONGO_URL = "mongodb://mongo:27017/";
const MONGO_DB_NAME = "dbGrids";
const MONGO_COLLECTION_ACCOUNT = "accounts";

const mongoClient = new MongoClient(MONGO_URL);

export async function fetchGrid(gridName: string) {
  const { userId } = auth();

  if (typeof userId !== 'string') {
    console.error('User ID is null or not a string');
    return null;
  }

  try {
    await mongoClient.connect();
    const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection<User>(MONGO_COLLECTION_ACCOUNT);
    const userInfo = await accountsCollection.findOne({ _id: userId });

    // Look for the grid by name across all courses
    for (const course of userInfo?.courses ?? []) {
      const grid = course.grids?.find(g => g.gridName === gridName);
      if (grid) {
        return grid; // Found the grid
      }
    }

    console.log('Grid not found');
    return null; // Grid not found
  } catch (error) {
    console.error('Error fetching grid:', error);
    return null;
  } finally {
    await mongoClient.close();
  }
}
