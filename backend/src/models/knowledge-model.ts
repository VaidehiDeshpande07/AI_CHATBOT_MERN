import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema({
    question: { type: String, required: true, unique: true },
    answer: { type: String, required: true },
    tags: { type: [String], default: [] }, // For categorization
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Knowledge", knowledgeSchema);
