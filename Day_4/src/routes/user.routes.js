import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWt } from "../middlewares/auth.middlewares.js";

const routes = Router();

routes.route("/register").post(



   upload.fields([             //it is a middleweare use to uplode file or image it is came from multer 
    {
        name:"avatar",
        maxCount:1,
    },                                            
    {
        name:"coverImage",
        maxCount:1 
    }
   ]),
    registerUser
);

routes.route("/login").post(loginUser)
// secured routes

routes.route("/logout").post(verifyJWt, logoutUser)

routes.route("/refresh-token").post(refreshAccessToken)

routes.route("/change-password").post(verifyJWt,changeCurrentPassword)

routes.route("/current-user").get(verifyJWt,getCurrentUser)   //we using get because we are not sending any data or something 

routes.route("/update-account").patch(verifyJWt,updateAccountDetails)       //PATCH is an HTTP method used to partially update existing data.         whenever you area taking data from files we use patch 

routes.route("/avatar").patch(verifyJWt, upload.single("avatar"), updateUserAvatar)

routes.route("/cover-image").patch(verifyJWt, upload.single("coverImage"), updateUserCoverImage)

routes.route("/c/:username").get(verifyJWt,getUserChannelProfile)

routes.route("/history").get(verifyJWt, getWatchHistory)


export default routes;