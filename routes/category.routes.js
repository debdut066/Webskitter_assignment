import express from "express"
import * as CategoryController from "../controllers/category.controller.js"
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/all', auth, CategoryController.getAllCategories);

export default router;