import bcrypt from "bcrypt"
import userSchema from "../schema/user.schema.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});
  

export const comparePassword = (Inputpassword, UserPassword) => {
    try {
        const isValid = bcrypt.compareSync(
            Inputpassword,
            UserPassword
        )
        return isValid;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const generateToken = (user) => {
    const token = jwt.sign(
        {
          id: user._id,
          username : user.username,
        },
        process.env.JWT_KEY
    );
    try {
        return token;
    } catch (error) {
        return false;
    }
}

export const generateHashPassword = (password) => {
    const newPassword = bcrypt.hashSync(password, 5);
    try {
        return newPassword;
    } catch (error) {
        return false;
    }
}

export const existUser = async (userName) => {
    try {
        const userExist = await userSchema.aggregate([
            { $match : { username : userName }},
            { $project: { _id: 1, username: 1, img: 1, password : 1 } }
        ]);
        return userExist;
    } catch (error) {
        throw error.message
    }
}

export const uploadImage = async (file) =>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        return result.url;
    } catch (error) {
        console.log("error",error)
        return false;
    }
}
