import mongoose from 'mongoose'

const connectDb=()=> mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export default connectDb