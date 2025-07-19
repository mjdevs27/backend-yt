import mongoose  , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    admin:{
        type:Boolean,
        required:false
    },
    username:{
        type : String,
        unique: true , 
        required:true,
        lowercase:true,
        trim:true,
        index:true,
        // the indexing is made as true for a very particular reasoning so that the searing of the database is easy.
        // for ex: we searching usernames on instagram.
    },
    emails:{
        type : String,
        unique: true , 
        required:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type : String, 
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    avatar:{
        type : String, //cloudinary url
        required:true 
    },
    coverImage:{
        type : String
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String , 
        // generally not kept in this form as to avoid password leaks in case of database attacks.
        required:[true , "Password is a must."],
        length:[{
            min:8
        },{
            max:22
        }]
    },
    refreshtToken:{
        type: String
        // its a long string which is made by the JWT encryption algorithm to refreshToken upon expiry of accessTokens
    }
} ,
{
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password , 10)
    next()
})

// this is used to create custom methods in mongoose for our personal DB
userSchema.methods.isPasswordVerified = async function(password){
    return await bcrypt.compare(password , this.password)   
}

userSchema.methods.generateAcessToken= function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.userSchema,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.EXPIRY_ACCESS_TOKEN
        }

    )
}

userSchema.methods.generateAcessToken= function(){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.EXPIRY_REFRESH_TOKEN
        }

    )
}

export const User = mongoose.model("User" , userSchema)