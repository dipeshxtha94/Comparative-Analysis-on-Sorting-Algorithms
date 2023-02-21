import Test1 from "../../models/testModel";
import connectDb from "../../utils/connectMongo";


export default async function add1(req, res){
    await connectDb()
    const test1= await Test1.create(req.body)
    res.json({test1})
}