import { Request, Response } from "express";
import Knowledge from "../models/knowledge-model.js";

export const searchKnowledgeBase = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;
        
        if (!query) return res.status(400).json({ message: "Query is required" });

        // Find the closest matching entry
        const knowledge = await Knowledge.findOne({
            question: { $regex: query, $options: "i" } // Case-insensitive search
        });

        if (!knowledge) {
            return res.status(404).json({ message: "No relevant information found" });
        }

        return res.status(200).json({ answer: knowledge.answer });
    } catch (error) {
        console.error("Knowledge Base Search Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
