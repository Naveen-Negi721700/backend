import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiErrors(401, "unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiErrors(400, "Invalid access Token")
        }
        req.user = user;       // it is used so next controler can ascess it  [if is a next controler in user.routes.js] (logoutUser)
        next()
    } catch (error) {
        throw new ApiErrors(401, error?.message || "invalid access token")
    }
})