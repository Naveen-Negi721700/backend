import mongoose,{Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim: true,
    lowercase:true,
    index:true,               // it is use for index base searching it is use to search easily
  },
    email:{
    type:String,
    required:true,
    unique:true,
    trim: true,
    lowercase:true,
  },
  fullname:{
    type:String,
    required:true,
    trim: true,
    index:true,
  },
  acatar:{
    type:String,    // cloudineary url
    required:true,
  },
  coverImage:{
    type:String,  //cloudineary url
  },
  watchHistory:[
    {
     type:Schema.Types.ObjectId,
     ref:"Video",
    }
  ],
  password:{
    type:String,
    require: [true , "password is required"]
  },
  refreshTokens:{
    type:String,

  },

},{timestamps:true})

export const User=mongoose.model("User",userSchema)