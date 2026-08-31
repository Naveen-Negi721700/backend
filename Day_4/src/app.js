import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express"
const app=express();

app.use(cors({
    origin: Process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// import routes 
import routes from "./routes/user.routes.js";


// routes declaration
// we not use app.get because we diffrenceate routes and controlers use means we are using middleware
app.use("/api/v1/users", userRoutes);

// like http://localhost:8000/api/v1/user/login
// like http://localhost:8000/api/v1/user/register




export default app;