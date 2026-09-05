import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controllers.js";
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


export default routes;