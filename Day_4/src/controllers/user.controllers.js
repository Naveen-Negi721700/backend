import { ApiErrors } from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudineary.js"
import { apiResponce } from "../utils/apiResponse.js";



const registerUser= asyncHandler(async (req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })



    // get user detail from frontend
    // validation -not empty
    // check username is already exist: username , eamil    
    // check for image and avatar
    // uplode them to cloudneary ,avatar
    // create object entery create entery in db
    // remove password and refress token field from responcces
    // check for user creation
    // return res


    const{fullName, email, username, password}=req.body;

      console.log("req.body:", req.body);
    console.log("req.files:", req.files); 
    console.log("email",email);


    // we can use like that if else use so many if for checking for every 
    // if(fullName==="")
    // {
    //     throw new ApiErrors(400, "Full name is required")
    // }


    if([
        fullName, email, username, password].some((field)=>field?.trim()===""))
        {
            throw new ApiErrors(400, "All field are required")
        }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser)
    {
        throw new ApiErrors(409, "User with username or email already exist")
    }

 const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

   if(!avatarLocalPath)
   {
    throw new ApiErrors(400,"avatar is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   console.log("avatar upload result:", avatar)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar)
   {
        throw new ApiErrors(400,"avatar is required")

   }
    
  const user= await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
   username: username.toLowerCase(),
   })

   const createdUser = await User.findById(user._id).select("-password -refreshToken")   // by default in selected all are selected but if we write - in fron of any name if will unselected

   if(!createdUser)
   {
    throw new ApiErrors(500,"something went wrong while registering the user")
   }

   return res.status(201).json(
    new apiResponce(201,createdUser,"User register successfully")
   )
    
})

export {registerUser}