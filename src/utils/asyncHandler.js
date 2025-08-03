const asyncHandler = (requestHandler)=>{
    return  (req,res,next)=>{
        Promise.resolve(requestHandler(req , res , next)).catch((err)=>{next(err)})
    }
}

export {asyncHandler}
// 2nd way to do the same the thing is amking a async func and apply a try catch block