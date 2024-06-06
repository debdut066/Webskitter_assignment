import express from "express"
import * as QuestionController from "../controllers/question.controller.js"
import auth from "../middleware/auth.js";

const router = express.Router()

router.get('/category/:categoryName', auth, QuestionController.getQuestionsByCategory);
// router.post('/bulk', upload.single('file'), questionController.bulkAddQuestions);

export default router;