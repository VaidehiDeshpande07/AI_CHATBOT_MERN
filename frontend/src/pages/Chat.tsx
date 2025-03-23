// import { useRef, useState, useEffect, useLayoutEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import styles from "./Chat.module.css";
// import ChatItem from "../components/chat/ChatItem";
// import {
// 	deleteAllChats,
// 	getAllChats,
// 	postChatRequest,
// } from "../../helpers/api-functions";

// import sendIcon from "/logos/send-icon.png";
// import noMsgBot from "/logos/no-msg2.png";
// import upArrow from "/logos/up-arrow.png";
// import ChatLoading from "../components/chat/ChatLoading";

// import { useAuth } from "../context/context";
// import SpinnerOverlay from "../components/shared/SpinnerOverlay";
// import toast from "react-hot-toast";

// type Message = {
// 	role: "user" | "assistant";
// 	content: string;
// };

// const Chat = () => {
// 	const auth = useAuth();
// 	const navigate = useNavigate();

// 	const [chatMessages, setChatMessages] = useState<Message[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
// 	const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);

// 	const inputRef = useRef<HTMLTextAreaElement | null>(null);
// 	const messageContainerRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		if (messageContainerRef.current) {
// 			messageContainerRef.current.scrollTop =
// 				messageContainerRef.current.scrollHeight;
// 		}
// 	}, [chatMessages]);

// 	useLayoutEffect(() => {
// 		const getChats = async () => {
// 			try {
// 				if (auth?.isLoggedIn && auth.user) {
// 					const data = await getAllChats();
// 					setChatMessages([...data.chats]);
// 				}
// 				setIsLoadingChats(false);
// 			} catch (err) {
// 				console.log(err);
// 				setIsLoadingChats(false);
// 			}
// 		};
// 		getChats();
// 	}, [auth]);

// 	useEffect(() => {
// 		if (!auth?.user) {
// 			return navigate("/login");
// 		}
// 	}, [auth]);

// 	const sendMsgHandler = async () => {
// 		const content = inputRef.current?.value as string;

// 		if (inputRef.current) inputRef.current.value = "";

// 		const newMessage: Message = { role: "user", content };
// 		setChatMessages((prev) => [...prev, newMessage]);

// 		// send request to backend
// 		setIsLoading(true);
// 		const chatData = await postChatRequest(content);
// 		setChatMessages([...chatData.chats]);
// 		setIsLoading(false);
// 	};

// 	const deleteChatsToggle = () => {
// 		setDeleteChatToggle((prevState) => !prevState);
// 	};

// 	const clearChatsHandler = async () => {
// 		try {
// 			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
// 			const data = await deleteAllChats();
// 			setChatMessages(data.chats);
// 			setDeleteChatToggle(false);
// 			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
// 		} catch (error: any) {
// 			toast.error(error.message, { id: "delete-msgs" });
// 		}
// 	};

// 	const variants = {
// 		animate: {
// 			y: [0, -10, 0, -10, 0],
// 			transition: {
// 				type: "spring",
// 				y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
// 			},
// 		},
// 	};

// 	const logo = {
// 		animate: {
// 			y: [0, -5, 0, -5, 0],
// 			transition: {
// 				type: "spring",
// 				y: {
// 					repeat: Infinity,
// 					duration: 4,
// 					stiffness: 100,
// 					damping: 5,
// 				},
// 			},
// 		},
// 		animateReverse: {
// 			transform: "rotate(180deg)",
// 			y: "-4",
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 		initialBtn: {
// 			y: "4",
// 			opacity: 0,
// 		},
// 		animateBtn: {
// 			y: 0,
// 			opacity: 1,
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 		exitBtn: {
// 			y: "-20",
// 			opacity: 0,
// 			transition: {
// 				duration: 0.5,
// 			},
// 		},
// 	};

// 	const placeHolder = (
// 		<div className={styles.no_msgs}>
// 			<h3>GPT 3.5 TURBO</h3>
// 			<motion.div
// 				className={styles.no_msg_logo}
// 				variants={variants}
// 				animate='animate'>
// 				<img alt='no msg bot' src={noMsgBot}></img>
// 			</motion.div>
// 			<p>
// 				It's quiet in here! Be the first to break the silence and send a message
// 				to get the conversation going.
// 			</p>
// 		</div>
// 	);

// 	const chats = chatMessages.map((chat) => (
// 		<ChatItem //@ts-ignore
// 			key={`${chat.content}${Math.random()}`} //@ts-ignore
// 			content={chat.content} //@ts-ignore
// 			role={chat.role}
// 		/>
// 	));

// 	return (
// 		<div className={styles.parent}>
// 			<div className={styles.chat} ref={messageContainerRef}>
// 				{isLoadingChats && <SpinnerOverlay />}
// 				{!isLoadingChats && (
// 					<>
// 						{chatMessages.length === 0 && placeHolder}
// 						{chatMessages.length !== 0 && chats}
// 						{isLoading && <ChatLoading />}
// 					</>
// 				)}
// 			</div>
// 			<div className={styles.inputContainer}>
// 				<div className={styles.inputArea}>
// 					<div className={styles.eraseMsgs}>
// 						<motion.img
// 							variants={logo}
// 							animate={!deleteChatToggle ? "animate" : "animateReverse"}
// 							src={upArrow}
// 							alt='top icon'
// 							onClick={deleteChatsToggle}
// 						/>
// 						<AnimatePresence>
// 							{deleteChatToggle && (
// 								<motion.button
// 									className={styles.eraseBtn}
// 									onClick={clearChatsHandler}
// 									variants={logo}
// 									initial='initialBtn'
// 									animate='animateBtn'
// 									exit='exitBtn'>
// 									CLEAR CHATS
// 								</motion.button>
// 							)}
// 						</AnimatePresence>
// 					</div>
// 					<textarea
// 						className={styles.textArea}
// 						maxLength={1500}
// 						ref={inputRef}
//                         rows={1}
// 						disabled={isLoadingChats || isLoading ? true : false}
// 						placeholder='Enter your query here'
// 					/>
// 					<button className={styles.icon} onClick={sendMsgHandler}>
// 						<img alt='icon' src={sendIcon} />
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Chat;



// import { useRef, useState, useEffect, useLayoutEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import styles from "./Chat.module.css";
// import ChatItem from "../components/chat/ChatItem";
// import {
// 	deleteAllChats,
// 	getAllChats,
// 	postChatRequest,
// } from "../../helpers/api-functions";

// import sendIcon from "/logos/send-icon.png";
// import micIcon from "./micIcon.png"// Add a mic icon here
// import noMsgBot from "/logos/no-msg2.png";
// import upArrow from "/logos/up-arrow.png";
// import ChatLoading from "../components/chat/ChatLoading";

// import { useAuth } from "../context/context";
// import SpinnerOverlay from "../components/shared/SpinnerOverlay";
// import toast from "react-hot-toast";

// type Message = {
// 	role: "user" | "assistant";
// 	content: string;
// };

// const Chat = () => {
// 	const auth = useAuth();
// 	const navigate = useNavigate();

// 	const [chatMessages, setChatMessages] = useState<Message[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
// 	const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);
// 	const [isListening, setIsListening] = useState<boolean>(false); // Track STT state

// 	const inputRef = useRef<HTMLTextAreaElement | null>(null);
// 	const messageContainerRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		if (messageContainerRef.current) {
// 			messageContainerRef.current.scrollTop =
// 				messageContainerRef.current.scrollHeight;
// 		}
// 	}, [chatMessages]);

// 	useLayoutEffect(() => {
// 		const getChats = async () => {
// 			try {
// 				if (auth?.isLoggedIn && auth.user) {
// 					const data = await getAllChats();
// 					setChatMessages([...data.chats]);
// 				}
// 				setIsLoadingChats(false);
// 			} catch (err) {
// 				console.log(err);
// 				setIsLoadingChats(false);
// 			}
// 		};
// 		getChats();
// 	}, [auth]);

// 	useEffect(() => {
// 		if (!auth?.user) {
// 			return navigate("/login");
// 		}
// 	}, [auth]);

// 	// Speech-to-Text Function
// 	const startListening = () => {
// 		const SpeechRecognition =
// 			window.SpeechRecognition || window.webkitSpeechRecognition;
// 		if (!SpeechRecognition) {
// 			alert("Speech recognition is not supported in this browser.");
// 			return;
// 		}

// 		const recognition = new SpeechRecognition();
// 		recognition.continuous = false;
// 		recognition.lang = "en-US";

// 		recognition.onstart = () => setIsListening(true);
// 		recognition.onend = () => setIsListening(false);

// 		recognition.onresult = (event) => {
// 			const transcript = event.results[0][0].transcript;
// 			if (inputRef.current) {
// 				inputRef.current.value = transcript;
// 			}
// 		};

// 		recognition.onerror = (event) => {
// 			console.error("Speech Recognition Error:", event.error);
// 			setIsListening(false);
// 		};

// 		recognition.start();
// 	};

// 	const sendMsgHandler = async () => {
// 		const content = inputRef.current?.value as string;
// 		if (!content.trim()) return;

// 		if (inputRef.current) inputRef.current.value = "";

// 		const newMessage: Message = { role: "user", content };
// 		setChatMessages((prev) => [...prev, newMessage]);

// 		// Send request to backend
// 		setIsLoading(true);
// 		const chatData = await postChatRequest(content);
// 		setChatMessages([...chatData.chats]);
// 		setIsLoading(false);
// 	};

// 	const deleteChatsToggle = () => {
// 		setDeleteChatToggle((prevState) => !prevState);
// 	};

// 	const clearChatsHandler = async () => {
// 		try {
// 			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
// 			const data = await deleteAllChats();
// 			setChatMessages(data.chats);
// 			setDeleteChatToggle(false);
// 			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
// 		} catch (error: any) {
// 			toast.error(error.message, { id: "delete-msgs" });
// 		}
// 	};

// 	const variants = {
// 		animate: {
// 			y: [0, -10, 0, -10, 0],
// 			transition: {
// 				type: "spring",
// 				y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
// 			},
// 		},
// 	};

// 	const chats = chatMessages.map((chat) => (
// 		<ChatItem key={`${chat.content}${Math.random()}`} content={chat.content} role={chat.role} />
// 	));

// 	return (
// 		<div className={styles.parent}>
// 			<div className={styles.chat} ref={messageContainerRef}>
// 				{isLoadingChats && <SpinnerOverlay />}
// 				{!isLoadingChats && (
// 					<>
// 						{chatMessages.length === 0 && (
// 							<div className={styles.no_msgs}>
// 								<h3>GPT 3.5 TURBO</h3>
// 								<motion.div className={styles.no_msg_logo} variants={variants} animate="animate">
// 									<img alt="no msg bot" src={noMsgBot}></img>
// 								</motion.div>
// 								<p>
// 									It's quiet in here! Be the first to break the silence and send a message
// 									to get the conversation going.
// 								</p>
// 							</div>
// 						)}
// 						{chatMessages.length !== 0 && chats}
// 						{isLoading && <ChatLoading />}
// 					</>
// 				)}
// 			</div>
// 			<div className={styles.inputContainer}>
// 				<div className={styles.inputArea}>
// 					<div className={styles.eraseMsgs}>
// 						<motion.img
// 							variants={variants}
// 							animate={!deleteChatToggle ? "animate" : "reverse"}
// 							src={upArrow}
// 							alt="top icon"
// 							onClick={deleteChatsToggle}
// 						/>
// 						<AnimatePresence>
// 							{deleteChatToggle && (
// 								<motion.button
// 									className={styles.eraseBtn}
// 									onClick={clearChatsHandler}
// 									initial={{ y: "4", opacity: 0 }}
// 									animate={{ y: 0, opacity: 1 }}
// 									exit={{ y: "-20", opacity: 0 }}
// 								>
// 									CLEAR CHATS
// 								</motion.button>
// 							)}
// 						</AnimatePresence>
// 					</div>

// 					{/* 🛠️ Mic Button (STT) Added */}
					

// 					{/* Chat Input */}
// 					<textarea
// 						className={styles.textArea}
// 						maxLength={1500}
// 						ref={inputRef}
// 						rows={1}
// 						disabled={isLoadingChats || isLoading}
// 						placeholder="Enter your query here"
// 					/>

// 					{/* Send Message Button */}
// 					<button className={styles.icon} style={{marginRight:'10px', marginLeft:'5px'}} onClick={startListening} disabled={isListening}>
// 						<img alt="mic icon" src={micIcon}  />
						
// 					</button>
				
// 					<button className={styles.icon} onClick={sendMsgHandler}>
// 						<img alt="send icon" src={sendIcon} />
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Chat;



import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import {
	deleteAllChats,
	getAllChats,
	postChatRequest,
	checkKnowledgeBase, // ✅ Import KB function
} from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import micIcon from "./micIcon.png"; // 🛠 Mic icon
import noMsgBot from "/logos/no-msg2.png";
import upArrow from "/logos/up-arrow.png";
// import ChatLoading from "../components/chat/ChatLoading";

import { useAuth } from "../context/context";
import SpinnerOverlay from "../components/shared/SpinnerOverlay";
import toast from "react-hot-toast";

type Message = {
	role: "user" | "assistant";
	content: string;
};

const Chat = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
	const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);
	const [isListening, setIsListening] = useState<boolean>(false); // 🛠 Track STT state

	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const messageContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop =
				messageContainerRef.current.scrollHeight;
		}
	}, [chatMessages]);

	useLayoutEffect(() => {
		const getChats = async () => {
			try {
				if (auth?.isLoggedIn && auth.user) {
					const data = await getAllChats();
					setChatMessages([...data.chats]);
				}
				setIsLoadingChats(false);
			} catch (err) {
				console.log(err);
				setIsLoadingChats(false);
			}
		};
		getChats();
	}, [auth]);

	useEffect(() => {
		if (!auth?.user) {
			return navigate("/login");
		}
	}, [auth]);

	// 🛠 Speech-to-Text Function
	const startListening = () => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert("Speech recognition is not supported in this browser.");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.lang = "en-US";

		recognition.onstart = () => setIsListening(true);
		recognition.onend = () => setIsListening(false);

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			if (inputRef.current) {
				inputRef.current.value = transcript;
			}
		};

		recognition.onerror = (event) => {
			console.error("Speech Recognition Error:", event.error);
			setIsListening(false);
		};

		recognition.start();
	};

	// 🛠 Updated sendMsgHandler to check KB before AI
	const sendMsgHandler = async () => {
		const content = inputRef.current?.value?.trim();
		if (!content) return;

		if (inputRef.current) inputRef.current.value = "";

		const newMessage: Message = { role: "user", content };
		setChatMessages((prev) => [...prev, newMessage]);

		// ✅ Check Knowledge Base First
		setIsLoading(true);
		const kbResponse = await checkKnowledgeBase(content);

		if (kbResponse) {
			// ✅ KB has an answer, use it
			const botResponse: Message = { role: "assistant", content: kbResponse };
			setChatMessages((prev) => [...prev, botResponse]);
			setIsLoading(false);
			return;
		}

		// ❌ If no KB answer, call AI
		const chatData = await postChatRequest(content);
		setChatMessages([...chatData.chats]);
		setIsLoading(false);
	};

	const deleteChatsToggle = () => {
		setDeleteChatToggle((prevState) => !prevState);
	};

	const clearChatsHandler = async () => {
		try {
			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
			const data = await deleteAllChats();
			setChatMessages(data.chats);
			setDeleteChatToggle(false);
			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
		} catch (error: any) {
			toast.error(error.message, { id: "delete-msgs" });
		}
	};

	const variants = {
		animate: {
			y: [0, -10, 0, -10, 0],
			transition: {
				type: "spring",
				y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
			},
		},
	};

	const chats = chatMessages.map((chat) => (
		<ChatItem key={`${chat.content}${Math.random()}`} content={chat.content} role={chat.role} />
	));

	return (
		<div className={styles.parent}>
			<div className={styles.chat} ref={messageContainerRef}>
				{isLoadingChats && <SpinnerOverlay />}
				{!isLoadingChats && (
					<>
						{chatMessages.length === 0 && (
							<div className={styles.no_msgs}>
								<h3>AI Knowledge Assistant</h3>
								<motion.div className={styles.no_msg_logo} variants={variants} animate="animate">
									<img alt="no msg bot" src={noMsgBot}></img>
								</motion.div>
								<p>
									Ask a question! The bot will check the knowledge base first, then AI if needed.
								</p>
							</div>
						)}
						{chatMessages.length !== 0 && chats}
						{isLoading && <p className={styles.kb_loading}>Checking knowledge base...</p>}
					</>
				)}
			</div>
			<div className={styles.inputContainer}>
				<div className={styles.inputArea}>
					<div className={styles.eraseMsgs}>
						<motion.img
							variants={variants}
							animate={!deleteChatToggle ? "animate" : "reverse"}
							src={upArrow}
							alt="top icon"
							onClick={deleteChatsToggle}
						/>
						<AnimatePresence>
							{deleteChatToggle && (
								<motion.button
									className={styles.eraseBtn}
									onClick={clearChatsHandler}
									initial={{ y: "4", opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: "-20", opacity: 0 }}
								>
									CLEAR CHATS
								</motion.button>
							)}
						</AnimatePresence>
					</div>

					{/* 🛠 Mic Button (STT)
					<button className={styles.icon} style={{ marginRight: '10px', marginLeft: '5px' }} onClick={startListening} disabled={isListening}>
						<img alt="mic icon" src={micIcon} />
					</button> */}

					{/* Chat Input */}
					<textarea
						className={styles.textArea}
						maxLength={1500}
						ref={inputRef}
						rows={1}
						disabled={isLoadingChats || isLoading}
						placeholder="Enter your query here"
					/>
					{/* 🛠 Mic Button (STT) */}
					<button className={styles.icon} style={{ marginRight: '15px', marginLeft: '5px' }} onClick={startListening} disabled={isListening}>
						<img alt="mic icon" src={micIcon} />
					</button>

					{/* Send Message Button */}
					<button className={styles.icon} onClick={sendMsgHandler}>
						<img alt="send icon" src={sendIcon} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
