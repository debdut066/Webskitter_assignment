import mongoose from "mongoose";
import User from "../schema/user.schema.js";
import { 
    generateHashPassword, 
    generateToken, 
    existUser, 
    comparePassword,
    uploadImage 
} from "../utils/helper.js";

export const registerUser = async (Body) => {
    const isUser = await existUser(Body.username);
    if(isUser.length === 0){
        const hashPassword = generateHashPassword(Body.password);
        
        const userData = new User({
            _id : new mongoose.Types.ObjectId(),
            username : Body.username,
            email : Body.email,
            password : hashPassword
        });

        const newUser = await userData.save();
        const token = generateToken(newUser)

        try{
            return {
                msg : "Registration is successfull",
                user : userData,
                token : token
            };
        }catch(error){
            console.log(error);
            return "Something went wrong"
        }
    }else{
        return "Username or Email already has been taken";
    }
}

export const loginUser = async (Body) => {
    try{
        const isUser = await existUser(Body.username);

        if(isUser.length === 0){
            throw new Error("Incorrect username or email")
        }else{
            const isPasswordValid = comparePassword(Body.password, isUser[0].password);
            if(!isPasswordValid){
                throw new Error("Password is incorrect");
            }else{
                const token = generateToken(isUser[0]);
                return {
                    msg : "LogIn is successfull",
                    user : isUser[0],
                    token : token
                }
            }
        }
    }catch(error){
        throw new Error(error.message)
    }
}

export const getProfile = async (userName) => {
    try {
        const result = await User.aggregate([
            { $match : { username : userName }},
            { $project: { _id: 1, username: 1, img: 1 } }
        ]);

        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateProfile = async (reqData) => {
    try{
        let {file, userId } = reqData;
        const result = await uploadImage(file);
        response = await User.findByIdAndUpdate(userId, 
            { 
                $set : {
                    img : result
                } 
            },
            { projection: { name: 1, img : 1 }, new: true }
        )
        return "image updated"
    }catch(error){
        throw new Error(error.message)
    }
}