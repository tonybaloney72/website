import { Outlet, useNavigate, useLocation } from "react-router-dom";
import succt from "../assets/SUCCT.png";
import todo from "../assets/todo.png";
import potLuck from "../assets/PotLuck.png";
import wordle from "../assets/wordle.png";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ProjectCardProps {
	title: ReactNode;
	description: string;
	image: string;
	onClick: () => void;
	imagePosition?: "left" | "right";
}

const ProjectCard = ({
	title,
	description,
	image,
	onClick,
	imagePosition = "right",
}: ProjectCardProps) => {
	const isImageLeft = imagePosition === "left";
	const flexDirection = isImageLeft ? "flex-col-reverse" : "flex-col";
	const textPadding = isImageLeft ? "pr-0 md:pr-3" : "pl-0 md:pl-3";

	return (
		<motion.div
			className={`flex ${flexDirection} items-center md:flex-row md:items-stretch justify-between max-w-[1280px] gap-4 md:gap-10 hover:cursor-pointer hover:bg-secondary hover:transition duration-300`}
			whileHover={{ scale: 1.01 }}
			whileTap={{ scale: 0.99 }}
			transition={{ duration: 0.1 }}
			onClick={onClick}>
			{isImageLeft && (
				<div className='w-full md:w-1/3 h-56 md:h-auto md:min-h-[220px] overflow-hidden rounded-sm'>
					<img
						src={image}
						className='w-full h-full object-cover object-center'
					/>
				</div>
			)}
			<div
				className={`flex flex-col gap-4 w-full md:w-2/3 py-0 md:py-1 ${textPadding}`}>
				<p className='text-2xl text-primary text-center'>{title}</p>
				<p className='text-lg text-secondary'>{description}</p>
			</div>
			{!isImageLeft && (
				<div className='w-full md:w-1/3 h-56 md:h-auto md:min-h-[220px] overflow-hidden rounded-sm'>
					<img
						src={image}
						className='w-full h-full object-cover object-center'
					/>
				</div>
			)}
		</motion.div>
	);
};

const SuperUltraTitle = () => (
	<>
		Super Ultra Coin Collector Turbo:
		<br />
		<span className='text-2xl'>Mega Extreme Edition</span>
		<br />
		<span className='text-base text-accent'>Javascript, HTML, CSS</span>
	</>
);

const superUltraDescription = `Get ready for a no-holds-barred thrill ride as you run around
							and collect coins on meticulously crafted levels designed to put
							your sklils to the test and break you down. Sound on!`;

const TodoTitle = () => (
	<>
		To Do List
		<br />
		<span className='text-base text-accent'>
			React, TailwindCSS, TypeScript
		</span>
	</>
);

const todoDescription = `Tried, tested, and true - the To Do List is every Web Developers
							bread and butter. An opportunity to show off state management
							and some styling and flair, it'd be weird if you didn't have one
							these in your portfolio.`;

const PotLuckApp = () => (
	<>
		Pot Luck App
		<br />
		<span className='text-base text-accent'>
			Vite, React 19, TypeScript, Redux Toolkit, TailwindCSS v4, React Router
			v7, Supabase (Auth, Storage, Database)
		</span>
	</>
);

const potLuckAppDescription = `Potluck App is a modern web application designed to simplify the organization of potluck events. Users can create events, invite friends, manage contributions, and stay connected through messaging and notifications. Built with a focus on user experience and real-time collaboration.`;

const WordleTitle = () => (
	<>
		Wordle Clone
		<br />
		<span className='text-base text-accent'>
			React, TypeScript, TailwindCSS
		</span>
	</>
);

const wordleDescription = `A Wordle-style guessing game with a random five-letter word each round, color feedback for every guess, and a fast restart flow for repeat plays.`;

export const ProjectPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isNestedProjectRoute = location.pathname !== "/projects";

	const handleSUCCTMEE = () => {
		window.open("https://tonybaloney72.github.io/SuperCoinCollector/", "blank");
	};

	const handleTodo = () => {
		navigate("/projects/todo");
	};

	const handlePotLuck = () => {
		window.open("https://tony-baloney-potluck.vercel.app/", "blank");
	};

	const handleWordle = () => {
		navigate("/projects/wordle");
	};

	return (
		<div className='flex flex-col gap-10 items-center'>
			{!isNestedProjectRoute && (
				<>
					<ProjectCard
						title={<SuperUltraTitle />}
						description={superUltraDescription}
						image={succt}
						onClick={handleSUCCTMEE}
						imagePosition='right'
					/>
					<ProjectCard
						title={<TodoTitle />}
						description={todoDescription}
						image={todo}
						onClick={handleTodo}
						imagePosition='left'
					/>
					<ProjectCard
						title={<PotLuckApp />}
						description={potLuckAppDescription}
						image={potLuck}
						onClick={handlePotLuck}
						imagePosition='right'
					/>
					<ProjectCard
						title={<WordleTitle />}
						description={wordleDescription}
						image={wordle}
						onClick={handleWordle}
						imagePosition='left'
					/>
				</>
			)}
			<Outlet />
		</div>
	);
};
