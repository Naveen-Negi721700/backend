import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
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
  fullName:{
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

userSchema.pre("save",async function (next){
  if(!this.isModified("password"))return next()

    this.password=bcrypt.hash(this.password,10)
    next();
})
userSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function (){
 return jwt.sign({
  _id:this._id,
  email:this.email,
  username:this.username,
  fullName:this.fullname,
 },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
  }
)
}

userSchema.methods.generateRefreshToken=function (){

  return jwt.sign({
  _id:this._id,
  
 },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
  }
)
}
export const User=mongoose.model("User",userSchema)