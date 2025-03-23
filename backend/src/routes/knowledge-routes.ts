import express from "express";
import { searchKnowledgeBase } from "../controllers/knowledge-controller.js";

const router = express.Router();

router.post("/search", searchKnowledgeBase);

export default router;
