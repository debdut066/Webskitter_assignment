import express from "express"
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/profile/:username', auth, userController.getProfile);
router.patch('/profile/update', auth, userController.editProfile);

export default router;