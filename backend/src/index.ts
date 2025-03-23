import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import knowledgeRoutes from "./routes/knowledge-routes.js";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";

// import { config } from "dotenv";


// dotenv.config();
dotenv.config({ path: "./.env.txt" });



// config();

const app = express();

// Middlewares
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);


app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev")); // for development

// routes
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);
app.use("/api/knowledge", knowledgeRoutes);

// Connections and Listeners
mongoose
	.connect('mongodb://localhost:27017/Chatbot')
	.then(() => {
		app.listen(process.env.PORT || 5001);
		console.log(
			`Server started on port ${
				process.env.PORT || 5001
			} and Mongo DB is connected`
		);
	})
	.catch((err) => {
		console.log(err);
	});
