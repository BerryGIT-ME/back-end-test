import express from "express";
import { resizeImage } from "../controllers/resizeImage.js";
import { protect } from "../middleware/protect.js";
import { validateThumnailUrl } from "../middleware/validate.js";

const router = express.Router();

router.route("/").post(protect, validateThumnailUrl, resizeImage);

export default router;
