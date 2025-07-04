import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        // so this connectionInstance is the response that is recieved in the form of an object
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected using mongoose and the DB host is ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("the error is " , error)
        process.exit(1)
    }
}

export default connectDB