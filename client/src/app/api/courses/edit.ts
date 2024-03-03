import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body; // Your course data

        const client = new MongoClient(process.env.MONGODB_URI as string);
        try {
            await client.connect();
            const db = client.db("yourDbName");
            // Update logic here
            // ...
            res.status(200).json({ message: 'Course updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
