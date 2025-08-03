
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_API_KEY,
api_secret:process.env.CLOUD_API_SECRET
})

const uploadOncloudinary = async (localfilepath)=>{
    try {
        if(!localfilepath){
            return null
        }
        else{
            // so the response from the cloudinary will be in the response and response in itself is a object
            const response = await cloudinary.uploader.upload(localfilepath , {
                resource_type: "auto"
            })
            console.log("the response is an object it has" , response.url , "and many omore other things")
            fs.unlinkSync(localfilepath)
            return response
        }
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return error 
    }

}

export {uploadOncloudinary}