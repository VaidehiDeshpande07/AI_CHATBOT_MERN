// import mongoose from "mongoose";
// import Knowledge from "./models/knowledge-model.js";

// mongoose.connect("mongodb://localhost:27017/Chatbot").then(async () => {
//     await Knowledge.insertMany([
//         { question: "How to reset password?", answer: "Go to settings and click 'Reset Password'." },
//         { question: "What is our company policy on leave?", answer: "Check the HR portal under 'Leave Policy'." },
//     ]);
//     console.log("Knowledge Base Seeded");
//     process.exit();
// });

// const mongoose = require("mongoose");
// const Knowledge = require("./src/models/knowledge-model");

// mongoose.connect("mongodb://localhost:27017/Chatbot").then(async () => {
//     await Knowledge.insertMany([
//         { question: "How to reset password?", answer: "Go to settings and click 'Reset Password'." },
//         { question: "What is our company policy on leave?", answer: "Check the HR portal under 'Leave Policy'." },
//     ]);
//     console.log("Knowledge Base Seeded");
//     process.exit();
// });
import mongoose from "mongoose";
import Knowledge from "./models/knowledge-model.js"; // Ensure correct extension

mongoose.connect("mongodb://localhost:27017/Chatbot").then(async () => {
  try {
    await Knowledge.insertMany([
      {
        question: "How to reset password?",
        answer: "Go to settings and click 'Reset Password'.",
      },
      {
        question: "What is our company policy on leave?",
        answer: "Check the HR portal under 'Leave Policy'.",
      },
    ]);
    console.log("✅ Knowledge Base Seeded Successfully");
  } catch (error) {
    console.error("❌ Error seeding knowledge base:", error);
  } finally {
    mongoose.connection.close();
  }
});
