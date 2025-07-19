import connectDB from "./db/connection.js";
import dotenv from "dotenv"
import {app} from './app.js'

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    const port = process.env.PORT || 3080
    app.listen(port , ()=>{
        console.log("Server is running at" , port )
    })
})
.catch((error)=>{
console.log("MONGO DB connection failed" , error )
})





// import express from "express";
// const app = express();
// (async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//     // so if the database is unable to talk to the express app then we an use the .on() method on the app itself
//        app.on("error" , (error)=>{
//                 console.log(error)
//        })
       
//        app.listen(process.env.PORT , ()=>{
//                 console.log(`the app is listening on the : ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.log("THE ERROR IS " , error)
//         process.exit(1)
//     }
// })()