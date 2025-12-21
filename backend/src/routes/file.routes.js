import express from "express";
import { listFiles } from "../controllers/file.controller.js";

const router = express.Router();

router.get("/", listFiles);

export default router;
