import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectdb=async ()=>{

    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
console.log(`Mongodb connected DB Host: ${connectionInstance.connection.host}`);
       

        
    } catch (error) {
        console.log("Mongodb connection error :", error);
        process.exit(1);
        
    }
}

export default connectdb; 