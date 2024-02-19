// pages/api/courses/getByAccountId/[account_id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Assuming you have set up your MongoDB connection string in your environment variables
const MONGO_URL: string = process.env.MONGO_URL || '';
const MONGO_DB_NAME: string = "dbGrids";
const MONGO_COLLECTION_COURSES: string = "courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extract account_id from the request query
    const { account_id } = req.query;
  
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        // Find courses that are associated with the provided account_id
        const courses = await db.collection(MONGO_COLLECTION_COURSES).find({ account_id: account_id.toString() }).toArray();
        
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for the given account.' });
        }

        res.status(200).json(courses);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    } finally {
        await client.close();
    }
}
