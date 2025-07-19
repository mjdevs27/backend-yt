import mongoose  , {Schema} from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    videofile:{
        type : String,
        required:true
    },
    thumbnail:{
        type : String,
        required:true
    },
    title:{
        type : String,
        required:true
    },
    decription:{
        type:String,
        required:true
    },
    duration:{
        type:String, //cloudinary url
        required:true
    },
    isPublished:{
        type:Boolean,
        defualt:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    views:{
        type:Number,
        required:true
    }
} , {
    timestamps:true
})

// this basically adds the mongooseAP to the model that is the videoSchema through the method called plugin which comes with mongooseAP
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video" , videoSchema)