import Question from "../schema/question.schema.js";
import fs from "fs"
import csv from "csv-parser"

export const getQuestionsByCategory = async (categoryName) => {
    try {
        const result = await Question.aggregate([
            {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "name",
                  as: "categoryInfo"
                }
            },
            {
                $match: {
                  "categoryInfo.name": categoryName
                }
            },
            {
                $project: {
                  _id: 1,
                  text: 1,
                  category: 1
                }
            }
        ])

        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const bulkAddQuestions = async (req, res) => {
    const { path: csvPath } = req.file;
    const questions = [];

    fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
            questions.push({
                text: row.text,
                categoty: row.category.split(',').map(cat => cat.trim())
            });
        })
        .on('end', async () => {
            for (let question of questions) {
                const categoryIds = await Category.find({ name: { $in: question.categories } }).select('_id');
                question.category = categoryIds.map(cat => cat._id);
                await Question.create(question);
            }
            res.json({ message: 'Questions added successfully' });
        });
};