import connectDb from "../../utils/connectMongo";
import Test from "../../models/testModel";
import { ObjectId } from 'bson'


export default async function handler(req, res) {
    await connectDb()
    const { id } = req.query;
    const dataId= ObjectId(id)
  
    if (!id) {
      return res.status(400).json({ error: 'Missing ID parameter' });
    }
  
    const deletedCount = await deleteDocumentById('Test', dataId);
  
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
  
    return res.json({ success: true });
  }