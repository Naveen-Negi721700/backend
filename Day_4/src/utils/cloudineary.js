import { v2 as cloudinary } from "cloudinary"
import { log } from "node:console";
import fs from "node:fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINEARY_CLOUD_NAME,
    api_key: process.env.CLOUDINEARY_API_KEY,
    api_secret: process.env.CLOUDINEARY_API_SECRET
});

const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath)return null;
       const response= await cloudinary.uploader.upload(
        localFilePath, {
        resource_type:'auto',
    }
)
console.log("file uploded successfully", response.url);
return response

        
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the locally saved tempery file asthe upload operation got failed
        return null
    }
}


export {uploadOnCloudinary}