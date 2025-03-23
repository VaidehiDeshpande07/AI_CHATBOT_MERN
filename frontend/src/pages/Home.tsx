// import mainBot from "/page-photos/homepage-bot.png";
// // import ui1 from "/page-photos/UI-1.png";

// import { NavLink } from "react-router-dom";

// import Section from "../components/home/Sections";

// import styles from "./Home.module.css";

// const Home = () => {
// 	return (
// 		<div className={styles.parent}>
// 			<Section
// 				src={mainBot}
// 				alt='main-bot'
// 				animateImg={true}
// 				imgStyle={styles.ui1}
// 				reverse={false}>
				
// 				<h1>
// 					DASH<span className={styles.highlight}>EASY</span>
// 				</h1>
// 				<h2 >Simplify | Automate | Succeed </h2>
				
// 				<p>
// 				Get ready solutions for your enterprises with our user friendly ERP interface and automated AI solutions
// 				</p>
// 				<NavLink to='/login' className={styles.btn}>
// 					Get Started For Free
// 				</NavLink>
// 			</Section>
// 		</div>
// 	);
// };

// export default Home;


import mainBot from "/page-photos/homepage-bot.png";
import { NavLink } from "react-router-dom";
import Section from "../components/home/Sections";
import styles from "./Home.module.css";
import { useState } from "react";

const Home = () => {
	// FAQ State
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	// FAQ Data
	const faqs = [
		{
			question: "Why does the ERP system look so complicated?",
		},
		{
			question: "I can’t find the module or feature I need. What should I do?",
		},
		{
			question: "The system is too slow when I use it. How can I fix this?",
		},
		{
			question: "I keep entering data, but it’s not saving or updating properly.",
		},
		{
			question: "I get access errors when trying to open certain features. What should I do?",
		},
		{
			question: "Why does the ERP keep logging me out?",
		},
		{
			question: "How can I make the interface easier to use?",
		},
		{
			question: "I accidentally deleted or changed important data. Can I recover it?",
		},{
			question: "I need a report, but I don’t know how to generate it.",
		},
		{
			question: "Can I use the ERP on my mobile device?",
		},
	];

	return (
		<div className={styles.parent}>
			<Section
				src={mainBot}
				alt='main-bot'
				animateImg={true}
				imgStyle={styles.ui1}
				reverse={false}>
				<h1>
					DASH<span className={styles.highlight}>EASY</span>
				</h1>
				<h2>Simplify | Automate | Succeed</h2>

				<p>
					Get ready solutions for your enterprises with our user-friendly ERP
					interface and automated AI solutions
				</p>
				<NavLink to='/login' className={styles.btn}>
					Get Started For Free
				</NavLink>
			</Section>

			{/* FAQ Section */}
			<section className={styles.faqSection}>
				<h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
				<div className={styles.faqContainer}>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
							onClick={() => toggleFAQ(index)}>
							<div className={styles.faqQuestion}>{faq.question}</div>
							{openIndex === index && (
								<div className={styles.faqAnswer}>{faq.answer}</div>
							)}
						</div>
					))}
				</div>
			</section>

			{/* Sticky Footer */}
			<footer className={styles.footer}>
				<p> Help - dasheasy2025@gmail.com | © 2025 DashEasy. All Rights Reserved.</p>
				
			</footer>
		</div>
	);
};

export default Home;
