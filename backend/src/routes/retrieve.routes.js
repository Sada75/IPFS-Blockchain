import express from "express";
import { retrieveFile } from "../controllers/retrieve.controller.js";

const router = express.Router();

router.post("/", retrieveFile);

export default router;
