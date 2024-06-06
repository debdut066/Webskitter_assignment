import * as UserModel from "../models/user.models.js"

export const getProfile = async (req, res, next) => {
    try {
        if(!req.params.username.trim()){
          throw new Error("Some of the parameter are missing")
        }else{
            let username = req.params.username.trim()
            const user = await UserModel.getProfile(username);
            return res.status(201).json(user);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const editProfile = async (req, res, next) => {
    try {
        let reqData = {
            file : req.files === null ? null : req.files.file,
            userId : req.userId
        }
        const response = await UserModel.updateProfile(reqData);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}