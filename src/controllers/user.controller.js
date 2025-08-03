import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { uploadOncloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
// get the userData from the frontend app(here i am using postman)
// check whether the user has added the required things or not 
// if the user has not added the fields then pass a error message
// if the user is already registered then pass they are already registered 
// now take the required fields of the files like avatar from the user 
// upload those to the cloudinary using the middleware 
// create a userObject to send to the database
// if all these checks are succesful then add the user to the Database
const {fullname , username , email , password} = req.body
if(
    [fullname , username , email , password].some((field)=>field?.trim() ==="")
)
{
    throw new ApiError(400,"All the fields are required")
}

const existedUser = await User.findOne({
    $or:[{username},{email}]
})
// console this

if(existedUser){
    throw new ApiError(409 , "You are already registered ")
}

// const avatarlocalfilepath = await req.files?.avatar[0]?.path
// console.log(avatarlocalfilepath)
// const localcovderImagepath = await req.files?.coverImage[0]?.path

// if (!avatarlocalfilepath) {
    // throw new ApiError(400, "Avatar file is required")
// }
// let coverImageLocalPath;
// if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        // coverImageLocalPath = req.files.coverImage[0].path
// }
    
// console these two these are the responses which will be recieved from the cloudinary
// const avatarcloudinayResponse = await uploadOncloudinary(avatarlocalfilepath)
// const covercloudinaryResponse = await uploadOncloudinary(localcovderImagepath)

// if(!avatarcloudinayResponse){
//      throw new ApiError(500, "Internal server error")
// }

const user = await User.create({
    fullname,
    // avatar:avatarcloudinayResponse.url,
    // coverImage:covercloudinaryResponse?.url || '',
    email,
    password,
    username
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(500 , "Sorry my bad")
}

res.status(201).json(
    new ApiError(200 , createdUser , "You have sucessfully registered")
)

})
export {registerUser}