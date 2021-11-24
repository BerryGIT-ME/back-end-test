import express from "express";
import { createNewUser } from "../controllers/login.js";
import { validateLogin } from "../middleware/validate.js";

const router = express.Router();

router.route("/").post(validateLogin, createNewUser);

export default router;
