import mongoose from "mongoose"

const categarySchema=new mongoose.Schema({

  name:{
    type :String,
    required:true,
  }


},{timestamps:true});

export const Categary =mongoose.model("Categary",categarySchema)
