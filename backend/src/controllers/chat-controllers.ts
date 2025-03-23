// import { Request, Response, NextFunction } from "express";
// import User from "../models/user-model.js";
// import { configureOpenAI } from "../configs/open-ai-config.js";
// import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

// export const generateChatCompletion = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const { message } = req.body;

// 		const user = await User.findById(res.locals.jwtData.id);
// 		if (!user) {
// 			return res.status(401).json("User not registered / token malfunctioned");
// 		}

// 		// grab chats of users

// 		const chats = user.chats.map(({ role, content }) => ({
// 			role,
// 			content,
// 		})) as ChatCompletionRequestMessage[];
// 		chats.push({ content: message, role: "user" });

// 		// save chats inside real user object
// 		user.chats.push({ content: message, role: "user" });

// 		// send all chats with new ones to OpenAI API
// 		const config = configureOpenAI();
// 		const openai = new OpenAIApi(config);

// 		// make request to openAi
// 		// get latest response
// 		const chatResponse = await openai.createChatCompletion({
// 			model: "gpt-3.5-turbo",
// 			messages: chats,
// 		});

// 		// push latest response to db
// 		user.chats.push(chatResponse.data.choices[0].message);
// 		await user.save();

// 		return res.status(200).json({ chats: user.chats });
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ message: error.message });
// 	}
// };

// export const getAllChats = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware
        
// 		if (!user)
// 			return res.status(401).json({
// 				message: "ERROR",
// 				cause: "User doesn't exist or token malfunctioned",
// 			});

// 		if (user._id.toString() !== res.locals.jwtData.id) {
// 			return res
// 				.status(401)
// 				.json({ message: "ERROR", cause: "Permissions didn't match" });
// 		}
// 		return res.status(200).json({ message: "OK", chats: user.chats });
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(200).json({ message: "ERROR", cause: err.message });
// 	}
// };

// export const deleteAllChats = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware
        
// 		if (!user)
// 			return res.status(401).json({
// 				message: "ERROR",
// 				cause: "User doesn't exist or token malfunctioned",
// 			});

// 		if (user._id.toString() !== res.locals.jwtData.id) {
// 			return res
// 				.status(401)
// 				.json({ message: "ERROR", cause: "Permissions didn't match" });
// 		}

//         //@ts-ignore
//         user.chats = []
//         await user.save()
// 		return res.status(200).json({ message: "OK", chats: user.chats });
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(200).json({ message: "ERROR", cause: err.message });
// 	}
// };

import { Request, Response, NextFunction } from "express";
import axios from "axios";
import Knowledge from "../models/knowledge-model.js";
import User from "../models/user-model.js";

// export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const { message } = req.body;

// 		// ✅ Validate user token
// 		if (!res.locals.jwtData || !res.locals.jwtData.id) {
// 			return res.status(401).json({ message: "Unauthorized: Invalid token" });
// 		}

// 		// ✅ Fetch user from DB
// 		const user = await User.findById(res.locals.jwtData.id);
// 		if (!user) {
// 			return res.status(401).json("User not registered / token malfunctioned");
// 		}

// 		// ✅ Ensure user.chats is an array (Fix TypeScript error)
// 		if (!Array.isArray(user.chats)) {
// 			user.chats = [];
// 		}

// 		// ✅ Prepare user chat history
// 		const chats = user.chats.map(({ role, content }) => ({
// 			role,
// 			content,
// 		}));
// 		chats.push({ content: message, role: "user" });

// 		// ✅ Save user message to DB before making API request
// 		user.chats.push({ content: message, role: "user" });
// 		await user.save();

// 		// ✅ Validate Hugging Face API key
// 		const huggingFaceKey = process.env.HUGGING_FACE_API_KEY;
// 		if (!huggingFaceKey) {
// 			console.error("❌ ERROR: Hugging Face API Key is missing.");
// 			return res.status(500).json({ message: "Hugging Face API Key missing" });
// 		}

// 		// ✅ Use a valid Hugging Face model
// 		const huggingFaceModel = "mistralai/Mistral-7B-Instruct-v0.1"; // Corrected model name
// 		// Alternative free model: "HuggingFaceH4/zephyr-7b-alpha"

// 		// ✅ Hugging Face API call
// 		const response = await axios.post(
// 			`https://api-inference.huggingface.co/models/${huggingFaceModel}`,
// 			{ inputs: message },
// 			{
// 				headers: {
// 					Authorization: `Bearer ${huggingFaceKey}`,
// 				},
// 			}
// 		);

// 		// ✅ Check API response
// 		if (!response.data || !response.data[0] || !response.data[0].generated_text) {
// 			console.error("❌ Hugging Face API Error:", response.data);
// 			return res.status(500).json({ message: "Invalid response from Hugging Face API." });
// 		}

// 		// ✅ Save Hugging Face response
// 		const botMessage = response.data[0].generated_text;
// 		user.chats.push({ role: "assistant", content: botMessage });
// 		await user.save();

// 		return res.status(200).json({ chats: user.chats });
// 	} catch (error) {
// 		console.error("❌ Chat Error:", error);
// 		return res.status(500).json({ message: error.message || "Internal Server Error" });
// 	}
// };


// export const generateChatCompletion = async (req: Request, res: Response) => {
//     try {
//         const { message } = req.body;

//         // ✅ Step 1: Check Knowledge Base
//         const knowledgeEntry = await Knowledge.findOne({ question: message });

//         if (knowledgeEntry) {
//             return res.status(200).json({ chats: [{ role: "assistant", content: knowledgeEntry.answer }] });
//         }

//         // ✅ Step 2: If not found, proceed with AI Model (Hugging Face API)
//         console.log("Query not found in KB, calling AI API...");

//         const response = await axios.post(
// 			"https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", // Change model name
// 			{ inputs: message },
// 			{
// 				headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` },
// 			}
// 		);
		

//         if (response.data && response.data.length > 0 && response.data[0].generated_text) {
//             return res.status(200).json({ chats: [{ role: "assistant", content: response.data[0].generated_text }] });
//         }

//         // ✅ Step 3: Ensure a fallback response is sent
//         return res.status(200).json({
//             chats: [{ role: "assistant", content: "I'm not sure about that. Can you rephrase?" }]
//         });

//     } catch (error) {
//         console.error("Chat Error:", error);
//         return res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };


export const generateChatCompletion = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        // ✅ Step 1: Get the user from DB
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered / token malfunctioned" });
        }

        // ✅ Step 2: Check Knowledge Base
        const knowledgeEntry = await Knowledge.findOne({ question: message });
        if (knowledgeEntry) {
            const assistantResponse = { role: "assistant", content: knowledgeEntry.answer };

            // Save both user message & bot response to DB
            user.chats.push({ role: "user", content: message });
            user.chats.push(assistantResponse);
            await user.save();

            return res.status(200).json({ chats: user.chats });
        }

        // ✅ Step 3: If not found in KB, proceed with AI Model (Hugging Face API)
        console.log("Query not found in KB, calling AI API...");

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", // Change model name if needed
            { inputs: message },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` },
            }
        );

        let aiResponse = "I'm not sure about that. Can you rephrase?"; // Default response
        if (response.data && response.data.length > 0 && response.data[0].generated_text) {
            aiResponse = response.data[0].generated_text;
        }

        // ✅ Step 4: Save User Query & AI Response to DB
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "assistant", content: aiResponse });
        await user.save();

        // ✅ Step 5: Return the full chat history
        return res.status(200).json({ chats: user.chats });

    } catch (error) {
        console.error("Chat Error:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



export const getAllChats = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!res.locals.jwtData || !res.locals.jwtData.id) {
			return res.status(401).json({ message: "Unauthorized: Invalid token" });
		}

		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
		}

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).json({ message: "Permissions didn't match" });
		}

		return res.status(200).json({ message: "OK", chats: user.chats });
	} catch (err) {
		console.error("Chat Fetch Error:", err);
		return res.status(500).json({ message: "ERROR", cause: err.message });
	}
};

// export const deleteAllChats = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		if (!res.locals.jwtData || !res.locals.jwtData.id) {
// 			return res.status(401).json({ message: "Unauthorized: Invalid token" });
// 		}

// 		const user = await User.findById(res.locals.jwtData.id);
// 		if (!user) {
// 			return res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
// 		}

// 		if (user._id.toString() !== res.locals.jwtData.id) {
// 			return res.status(401).json({ message: "Permissions didn't match" });
// 		}

// 		// Clear chats
// 		user.chats = [];
// 		await user.save();

// 		return res.status(200).json({ message: "OK", chats: user.chats });
// 	} catch (err) {
// 		console.error("Delete Chats Error:", err);
// 		return res.status(500).json({ message: "ERROR", cause: err.message });
// 	}
// };


// export const deleteAllChats = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		// ✅ Validate user token
// 		if (!res.locals.jwtData || !res.locals.jwtData.id) {
// 			return res.status(401).json({ message: "Unauthorized: Invalid token" });
// 		}

// 		// ✅ Fetch user from DB
// 		const user = await User.findById(res.locals.jwtData.id);
// 		if (!user) {
// 			return res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
// 		}

// 		// ✅ Ensure `chats` exists and clear properly
// 		if (!Array.isArray(user.chats)) {
// 			user.chats = [];
// 		}

// 		// ✅ Best way to clear Mongoose `DocumentArray`
// 		user.chats.set([]); // Use `.set([])` instead of `user.chats = []`
// 		await user.save();

// 		return res.status(200).json({ message: "All chats deleted successfully", chats: [] });
// 	} catch (err) {
// 		console.error("❌ Delete Chats Error:", err);
// 		return res.status(500).json({ message: "ERROR", cause: err.message });
// 	}
// };

export const deleteAllChats = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// ✅ Ensure user exists
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			return res.status(401).json({ message: "User doesn't exist or token malfunctioned" });
		}

		// ✅ Use updateOne() to directly clear chats in DB
		await User.updateOne({ _id: user._id }, { $set: { chats: [] } });

		return res.status(200).json({ message: "All chats deleted successfully", chats: [] });
	} catch (err) {
		console.error("❌ Delete Chats Error:", err);
		return res.status(500).json({ message: "ERROR", cause: err.message });
	}
};


