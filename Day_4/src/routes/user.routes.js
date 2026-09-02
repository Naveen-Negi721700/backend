import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

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


export default routes;