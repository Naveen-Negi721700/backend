import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
// import { DB_NAME } from "./constant.js";

// dotenv.config({
//     path:'./env'
// })


                                               // second approch 

import connectdb from "./db/index.js";

connectdb();

















                                                        // first apporach 

// import express from 'express'

// const app = express()

// const connect_db = async () => {
//   try {
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` )
//   .then(() => console.log('Connected!'));
  
//   app.on("error",(error)=>{
//     console.log("ERROR",error);
//     throw error
//   })

//   app.listen(process.env.PORT, () => {
//   console.log(`Server is running on ${process.env.PORT}`)
// })
//   } catch (error) {
//     console.log("ERROR: ", error)
//     throw(error)
//   }
// }

// export default connect_db











