import { Timestamp } from "mongodb";  
import mongoose from "mongoose" 

const sub_todoSchema=new mongoose.Schema({
  content:{
    type: String,
    required:true,
  },
  compleate:
  {
    type:Boolean,
    default:false,
  },
  createdby:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  }
},{Timestamp: true});

export const sub_todo=mongoose.model("sub_todo",sub_todoSchema);  