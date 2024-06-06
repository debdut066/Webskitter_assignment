import Category from "../schema/category.schema.js"


export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}