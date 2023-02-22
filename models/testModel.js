import { Schema, model, models } from 'mongoose'

const testSchema = new Schema({
  arrayData: { type: [String], required: true },
  sortedData: {type: [String], required: true},
  algorithmName: {type: String, require: true},
  executionTime: {type: String, required: true},
})


const Test= models.Test || model('Test', testSchema)

export default Test