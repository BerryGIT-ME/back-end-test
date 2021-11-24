import express from "express";
import { protect } from "../middleware/protect.js";
import { validatePatch } from "../middleware/validate.js";
import { patch } from "./../controllers/patch.js";

const router = express.Router();

router.route("/").patch(protect, validatePatch, patch);

export default router;
