
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from '../../../utils/mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { flowId } = req.query;
  const db = client.db('prim');
  const doc = JSON.parse(req.body);
  doc['_id'] = flowId;
  switch (req.method) {
      case 'POST': {
        try {
            const document = await db.collection('flows').replaceOne({'_id' : flowId }, doc, { upsert: true });
        } catch (e) {
            console.error(e)
        }
      }
  }
  res.end();
}