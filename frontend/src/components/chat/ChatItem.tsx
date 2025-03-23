// import ReactMarkdown from 'react-markdown'
// import reactGFM from 'remark-gfm'
// import rehypeHighlight from 'rehype-highlight';

// import styles from "./ChatItem.module.css";
// import 'highlight.js/styles/atom-one-dark.css';

// import botIcon from "/logos/bot.png";
// import { useAuth } from "../../context/context";

// type Props = {
// 	content: string;
// 	role: string;
// };

// const ChatItem = (props: Props) => {
	
// 	const auth = useAuth();

// 	const botMsg = (
// 		<div className={`${styles.parent} ${styles.bot_parent}`}>
// 			<div className={`${styles.avatar}`}>
// 				<img src={botIcon} alt='chat bot icon'></img>
// 			</div>
// 			<div className={`${styles.msg} markdown-body`}>
//                 <ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>  
//                     {props.content}
//                 </ReactMarkdown>
// 			</div>
// 		</div>
// 	);

// 	const userMsg = (
// 		<div className={`${styles.parent} ${styles.user_parent}`}>
// 			<div className={`${styles.avatar} ${styles.user_avatar}`}>
// 				{auth?.user?.name[0]}
// 				{auth?.user?.name.split(" ")[1][0]}
// 			</div>
// 			<div className={styles.msg}>
// 				<p>{props.content}</p>
// 			</div>
// 		</div>
// 	);

// 	return (
// 		<>
// 			{props.role === "assistant" && botMsg}
// 			{props.role === "user" && userMsg}
// 		</>
// 	);
// };

// export default ChatItem;




// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import reactGFM from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";

// import styles from "./ChatItem.module.css";
// import "highlight.js/styles/atom-one-dark.css";

// import botIcon from "/logos/bot.png";
// import speakerIcon from "./speakerIcon.png"; // 🔊 Added Speaker Icon
// import { useAuth } from "../../context/context";

// type Props = {
// 	content: string;
// 	role: string;
// };

// const ChatItem = (props: Props) => {
// 	const auth = useAuth();
// 	const [isSpeaking, setIsSpeaking] = useState<boolean>(false); // 🔊 Track speaking state

// 	// 🔊 TTS (Text-to-Speech) Function
// 	const speakText = () => {
// 		if (!window.speechSynthesis) {
// 			alert("Text-to-Speech is not supported in this browser.");
// 			return;
// 		}

// 		const utterance = new SpeechSynthesisUtterance(props.content);
// 		utterance.lang = "en-US";
// 		utterance.rate = 1; // Adjust speed (1 = normal)
// 		utterance.pitch = 1; // Adjust pitch

// 		// Event Listeners
// 		utterance.onstart = () => setIsSpeaking(true);
// 		utterance.onend = () => setIsSpeaking(false);
// 		utterance.onerror = (e) => {
// 			console.error("Speech Synthesis Error:", e);
// 			setIsSpeaking(false);
// 		};

// 		// Speak the message
// 		window.speechSynthesis.speak(utterance);
// 	};

// 	const botMsg = (
// 		<div className={`${styles.parent} ${styles.bot_parent}`}>
// 			<div className={`${styles.avatar}`}>
// 				<img src={botIcon} alt="chat bot icon" />
// 			</div>
// 			<div className={`${styles.msg} markdown-body`}>
// 				<ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>
// 					{props.content}
// 				</ReactMarkdown>

// 				{/* 🔊 Speaker Icon for Assistant Messages */}
// 				<button className={styles.speakerButton} onClick={speakText} disabled={isSpeaking}>
// 					<img src={speakerIcon} alt="Speak" />
// 				</button>
// 			</div>
// 		</div>
// 	);

// 	const userMsg = (
// 		<div className={`${styles.parent} ${styles.user_parent}`}>
// 			<div className={`${styles.avatar} ${styles.user_avatar}`}>
// 				{auth?.user?.name[0]}
// 				{auth?.user?.name.split(" ")[1][0]}
// 			</div>
// 			<div className={styles.msg}>
// 				<p>{props.content}</p>
// 			</div>
// 		</div>
// 	);

// 	return (
// 		<>
// 			{props.role === "assistant" && botMsg}
// 			{props.role === "user" && userMsg}
// 		</>
// 	);
// };

// export default ChatItem;






// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import reactGFM from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";

// import styles from "./ChatItem.module.css";
// import "highlight.js/styles/atom-one-dark.css";

// import botIcon from "/logos/bot.png";
// import speakerIcon from "./speakerIcon.png"; // 🔊 Added Speaker Icon
// import { useAuth } from "../../context/context";

// const ChatItem = ({ content, role }) => {
// 	const auth = useAuth();
// 	const [isSpeaking, setIsSpeaking] = useState(false); // 🔊 Track speaking state
// 	const speechRef = useRef(null); // Store SpeechSynthesisUtterance instance

// 	// 🔊 Stop speech if component unmounts
// 	useEffect(() => {
// 		return () => {
// 			if (speechRef.current) {
// 				window.speechSynthesis.cancel();
// 			}
// 		};
// 	}, []);

// 	// 🔊 TTS (Text-to-Speech) Function
// 	const speakText = () => {
// 		if (!window.speechSynthesis) {
// 			alert("Text-to-Speech is not supported in this browser.");
// 			return;
// 		}

// 		if (isSpeaking) {
// 			window.speechSynthesis.cancel();
// 			setIsSpeaking(false);
// 			return;
// 		}

// 		const utterance = new SpeechSynthesisUtterance(content);
// 		utterance.lang = "en-US";
// 		utterance.rate = 1; // Adjust speed (1 = normal)
// 		utterance.pitch = 1; // Adjust pitch
// 		speechRef.current = utterance;

// 		// Event Listeners
// 		utterance.onstart = () => setIsSpeaking(true);
// 		utterance.onend = () => setIsSpeaking(false);
// 		utterance.onerror = () => setIsSpeaking(false);

// 		// Speak the message
// 		window.speechSynthesis.speak(utterance);
// 	};

// 	const botMsg = (
// 		<div className={`${styles.parent} ${styles.bot_parent}`}>
// 			<div className={`${styles.avatar}`}>
// 				<img src={botIcon} alt="chat bot icon" />
// 			</div>
// 			<div className={`${styles.msg} markdown-body`}>
// 				<div className={styles.textContainer}>
// 					<ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>
// 						{content}
// 					</ReactMarkdown>

// 					{/* 🔊 Speaker Icon Positioned at End of First Line */}
// 					<button className={styles.speakerButton} onClick={speakText}>
// 						<img src={speakerIcon} alt="Speak" />
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);

// 	const userMsg = (
// 		<div className={`${styles.parent} ${styles.user_parent}`}>
// 			<div className={`${styles.avatar} ${styles.user_avatar}`}>
// 				{auth?.user?.name[0]}
// 				{auth?.user?.name.split(" ")[1]?.[0] || ""}
// 			</div>
// 			<div className={styles.msg}>
// 				<p>{content}</p>
// 			</div>
// 		</div>
// 	);

// 	return (
// 		<>
// 			{role === "assistant" && botMsg}
// 			{role === "user" && userMsg}
// 		</>
// 	);
// };

// export default ChatItem;







import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import reactGFM from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import styles from "./ChatItem.module.css";
import "highlight.js/styles/atom-one-dark.css";

import botIcon from "/logos/bot.png";
import speakerIcon from "./speakerIcon.png"; // 🔊 Speaker Icon
import { useAuth } from "../../context/context";

type Props = {
	content: string;
	role: string;
	source?: "knowledge_base" | "ai"; // 🛠 Added source to track KB responses
};

const ChatItem = ({ content, role, source }: Props) => {
	const auth = useAuth();
	const [isSpeaking, setIsSpeaking] = useState(false); // 🔊 Track speaking state
	const speechRef = useRef<SpeechSynthesisUtterance | null>(null); // Store SpeechSynthesisUtterance instance

	// 🔊 Stop speech if component unmounts
	useEffect(() => {
		return () => {
			if (speechRef.current) {
				window.speechSynthesis.cancel();
			}
		};
	}, []);

	// 🔊 TTS (Text-to-Speech) Function
	const speakText = () => {
		if (!window.speechSynthesis) {
			alert("Text-to-Speech is not supported in this browser.");
			return;
		}

		if (isSpeaking) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
			return;
		}

		const utterance = new SpeechSynthesisUtterance(content);
		utterance.lang = "en-US";
		utterance.rate = 1; // Adjust speed (1 = normal)
		utterance.pitch = 1; // Adjust pitch
		speechRef.current = utterance;

		// Event Listeners
		utterance.onstart = () => setIsSpeaking(true);
		utterance.onend = () => setIsSpeaking(false);
		utterance.onerror = () => setIsSpeaking(false);

		// Speak the message
		window.speechSynthesis.speak(utterance);
	};

	const botMsg = (
		<div className={`${styles.parent} ${styles.bot_parent}`}>
			<div className={`${styles.avatar}`}>
				<img src={botIcon} alt="chat bot icon" />
			</div>
			<div className={`${styles.msg} markdown-body`}>
				<div className={styles.textContainer}>
					{/* <ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>
						{content}
					</ReactMarkdown> */}
					<div className={styles.messageContainer}>
    <ReactMarkdown
        className={styles.markdownBody}
        remarkPlugins={[reactGFM]}
        rehypePlugins={[rehypeHighlight]}
    >
        {content}
    </ReactMarkdown>
</div>

					{/* 🔊 Speaker Icon Positioned at End of First Line */}
					<button className={styles.speakerButton} onClick={speakText}>
						<img src={speakerIcon} alt="Speak" />
					</button>
				</div>

				{/* 📌 Show Knowledge Source if from KB */}
				{source === "knowledge_base" && (
					<span className={styles.kbSource}>Source: Knowledge Base 📖</span>
				)}
			</div>
		</div>
	);

	const userMsg = (
		<div className={`${styles.parent} ${styles.user_parent}`}>
			<div className={`${styles.avatar} ${styles.user_avatar}`}>
				{auth?.user?.name[0]}
				{auth?.user?.name.split(" ")[1]?.[0] || ""}
			</div>
			<div className={styles.msg}>
				<p>{content}</p>
			</div>
		</div>
	);

	return (
		<>
			{role === "assistant" && botMsg}
			{role === "user" && userMsg}
		</>
	);
};

export default ChatItem;
