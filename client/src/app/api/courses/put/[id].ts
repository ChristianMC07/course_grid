// pages/api/courses/put/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const courseUpdates = req.body;

  const client = new MongoClient(process.env.MONGO_URL);
  try {
    await client.connect();
    const db = client.db('dbGrids');
    const updateResult = await db.collection('courses').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: courseUpdates }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: 'Course Not Found' });
    }

    res.status(200).json({ message: 'Course Updated Successfully' });
  } catch (error:any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  } finally {
    await client.close();
  }
}
