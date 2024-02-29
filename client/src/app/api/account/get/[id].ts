import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { getAccount } from '@/tools/DataManager';

const MONGO_URL: string = "mongodb://mongo:27017/";
const MONGO_DB_NAME: string = "dbGrids"; 
const MONGO_COLLECTION_ACCOUNT: string = "accounts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;

        let mongoClient: MongoClient = new MongoClient(MONGO_URL);

        try {
            await mongoClient.connect();
            const accountsCollection = mongoClient.db(MONGO_DB_NAME).collection(MONGO_COLLECTION_ACCOUNT);

            // Fetching the account by id
            const account = await accountsCollection.findOne({ _id: new ObjectId(id as string) });
            
            if (account) {
                // Do not send sensitive data like password hashes
                delete account.password;

                res.status(200).json({ success: true, account });
            } else {
                res.status(404).json({ success: false, message: 'Account not found' });
            }

        } catch (error: any) {
            console.error("Error in GET /account:", error.message);
            res.status(500).json({ success: false, message: 'An error occurred' });
        } finally {
            await mongoClient.close();
        }
    } else {
        res.status(405).end();
    }
}
