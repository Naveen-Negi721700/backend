import { ApiErrors } from "../utils/apiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";



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

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser)
    {
        throw new ApiErrors(409, "User with username or email already exist")
    }
    
    
})

export {registerUser}