import connectDb from "../../utils/connectMongo";
import Test from "../../models/testModel";
import { ObjectId } from 'bson'


export default async function handler(req, res) {
  const data = req.query;
  // const type = typeof(data);
  const id= data.id;
  const method = data.method;
  // console.log(type);
  await connectDb();

  if (method === 'del') {

    try {
      const deletedDocument = await Test.deleteOne({ _id: id });

      if (deletedDocument.deletedCount === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      return res.status(200).json({ message: 'Document deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }}
    try {
      // const {arrayData, sortedData}= req.body
      // const data= {arrayData, sortedData}
      const user = await Test.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }