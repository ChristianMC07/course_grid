'client';

import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids"; 
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { courseId, courseData } = req.body;

    if (typeof courseId !== 'string') {
        return res.status(400).json({ message: 'Invalid course ID' });
    }

    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('yourDatabaseName'); // Replace with your database name
        const courses = db.collection('courses'); // Replace with your collection name

        const result = await courses.updateOne(
            { _id: new ObjectId(courseId) },
            { $set: courseData }
        );

        if (!result.modifiedCount) {
            throw new Error('Course not found or not updated');
        }

        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await mongoClient.close();
    }
}