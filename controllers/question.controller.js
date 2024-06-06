import * as QuestionModel from "../models/question.models.js"

export const getQuestionsByCategory = async (req, res, next) => {
    try {
        if(!req.params.categoryName){
            throw new Error("Some of the parameter are missing")
        }else{
            const user = await QuestionModel.getQuestionsByCategory(req.params.categoryName);
            return res.status(201).json(user);
        }
    } catch (error) {
        next(error);
    }
}