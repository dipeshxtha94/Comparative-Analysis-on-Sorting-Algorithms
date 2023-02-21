import { Schema, model, models } from 'mongoose'

const newSchema= new Schema({
   sortedArray: { type: [String], required: true},
})

const Test1= models.Test1 || model('Test1', newSchema)

export default Test1