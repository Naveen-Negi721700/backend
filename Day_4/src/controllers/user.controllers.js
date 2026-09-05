import { ApiErrors } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudineary.js"
import { apiResponce } from "../utils/apiResponse.js";
import jwt, { decode } from "jsonwebtoken";
// its a function for getting ascessToken and refreshToken 

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiErrors(500, "Something went wrong while generating ascess and refresh tokens ")
    }
}





const registerUser = asyncHandler(async (req, res) => {
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


    const { fullName, email, username, password } = req.body;

    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("email", email);


    // we can use like that if else use so many if for checking for every 
    // if(fullName==="")
    // {
    //     throw new ApiErrors(400, "Full name is required")
    // }


    if ([
        fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiErrors(400, "All field are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiErrors(409, "User with username or email already exist")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const 
    // coverImageLocalPath 
    // = req
    // .files?.coverImage?.[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiErrors(400, "avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("avatar upload result:", avatar)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiErrors(400, "avatar is required")

    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")   // by default in selected all are selected but if we write - in fron of any name if will unselected

    if (!createdUser) {
        throw new ApiErrors(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponce(201, createdUser, "User register successfully")
    )

})




const loginUser = asyncHandler(async (req, res) => {

    // req body->data
    // username or email
    // find the user
    // password check
    // access and refresh token 
    // send cookies

    const { email, username, password } = req.body;
    console.log(email)


    // if(!(username || emal))      if we want only one
    if (!username && !email) {
        throw new ApiErrors(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiErrors(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiErrors(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,    //  this line is written  so 
        secure: true,       //  cookies cannot be modified by frontend 
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new apiResponce(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in Successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },

        }, {
        new: true,       //after this you get a updated responce not the older one 
    })


    const options = {
        httpOnly: true,    //  this line is written  so 
        secure: true,       //  cookies cannot be modified by frontend 
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new apiResponce(200, {}, "User logged out"))
})



const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiErrors(401, "unauthorized request")
    }

   try {
     const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id)
 
     if (!user) {
         throw new ApiErrors(401, "invalid Refresh Token")
     }
 
     if(incomingRefreshToken !== user?.refreshToken)
     {
          throw new ApiErrors(401, "Refresh token is expire or used")
     }
 
     const options={
         httpOnly: true,
         secure: true,
     }
 
    const {accessToken, newRefreshToken}= await generateAccessAndRefreshTokens(user._id)
     
     return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken", newRefreshToken, options).json(new apiResponce(200,{},"accessToken, refreshToken: newRefreshToken","Access token refreshed"))
   } catch (error) {
       throw new ApiErrors(401, error?.message || "Invalid refresh token")
   }

})


export { registerUser, loginUser, logoutUser, refreshAccessToken }