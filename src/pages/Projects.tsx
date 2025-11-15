import { Outlet, useNavigate, useLocation } from "react-router-dom";
import succt from "../assets/succt.png";
import todo from "../assets/todo.png";
import { motion } from "motion/react";

export const ProjectPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isTodoRoute = location.pathname === "/projects/todo";

	const handleSUCCTMEE = () => {
		window.open("https://tonybaloney72.github.io/SuperCoinCollector/", "blank");
	};

	const handleTodo = () => {
		navigate("/projects/todo");
	};

	return (
		<div className='flex flex-col gap-10 items-center'>
			{!isTodoRoute && (
				<>
					<motion.div
						className='flex flex-col items-center md:flex-row md:items-stretch justify-between max-w-[1280px] gap-4 md:gap-10 hover:cursor-pointer hover:bg-secondary hover:transition duration-300'
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						transition={{ duration: 0.1 }}
						onClick={handleSUCCTMEE}>
						<div className='flex flex-col gap-4 w-2/3 pt-1 pl-3'>
							<p className='text-2xl text-primary text-center'>
								Super Ultra Coin Collector Turbo:<p>Mega Extreme Edition</p>{" "}
								<p className='text-base text-accent'>Javascript, HTML, CSS</p>
							</p>
							<p className='text-lg text-secondary'>
								Get ready for a no-holds-barred thrill ride as you run around
								and collect coins on meticulously crafted levels designed to put
								your sklils to the test and break you down. Sound on!
							</p>
						</div>
						<img src={succt} className='w-1/3' />
					</motion.div>
					<motion.div
						className='flex flex-col-reverse items-center md:flex-row md:items-stretch justify-between max-w-[1280px] gap-4 md:gap-10 hover:cursor-pointer hover:bg-secondary hover:transition duration-300'
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						transition={{ duration: 0.1 }}
						onClick={handleTodo}>
						<img src={todo} className='w-1/3' />
						<div className='flex flex-col gap-4 w-2/3 pt-1 pr-3'>
							<p className='text-2xl text-primary text-center'>
								To Do List
								<p className='text-base text-accent'>React</p>
							</p>
							<p className='text-lg text-secondary'>
								Tried, tested, and true - the To Do List is every Web Developers
								bread and butter. An opportunity to show off state management
								and some styling and flair, it'd be weird if you didn't have one
								these in your portfolio.
							</p>
						</div>
					</motion.div>
				</>
			)}
			<Outlet />
		</div>
	);
};
