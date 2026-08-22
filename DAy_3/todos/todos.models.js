import mongoose from "mongoose"

const todoSchema=new mongoose.Schema({
  content:{
    type:string,
    required:true,
  },
  complete:{
    type:Boolean,
    default: false,

  },
  createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  subTodos:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"sub_todo"
    },
  ],

},{timestamps: true});

export const Todo=mongoose.model("Todo",todoSchema)

