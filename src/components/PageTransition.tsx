import { useLocation, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AboutPage } from "../pages/About.tsx";
import { ProjectPage } from "../pages/Projects.tsx";
import { ToDoList } from "../pages/ToDoList.tsx";

// Define route order for determining slide direction
// Routes with higher numbers slide in from the right (forward navigation)
// Routes with lower numbers slide in from the left (backward navigation)
const ROUTE_ORDER: Record<string, number> = {
	"/": 0, // About page - first in sequence
	"/projects": 1, // Projects page - second in sequence
	"/projects/todo": 2, // Contact page - third in sequence
};

export const PageTransition = () => {
	// Get the current route location from React Router
	const location = useLocation();

	// Use ref to track previous location - updated after render
	const prevLocationRef = useRef(location.pathname);

	// Calculate direction synchronously during render
	// This ensures direction is stable for the animation
	const currentOrder = ROUTE_ORDER[location.pathname] ?? 0;
	const prevOrder = ROUTE_ORDER[prevLocationRef.current] ?? 0;
	const direction: "left" | "right" =
		currentOrder > prevOrder ? "right" : "left";

	// Update ref after we've used it for direction calculation
	useEffect(() => {
		prevLocationRef.current = location.pathname;
	}, [location.pathname]);

	// Determine animation variants based on direction
	const variants = {
		enter: (direction: "left" | "right") => ({
			x: direction === "right" ? "100%" : "-100%",
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: "left" | "right") => ({
			x: direction === "right" ? "-100%" : "100%",
			opacity: 0,
		}),
	};

	return (
		<div className='relative w-full overflow-hidden'>
			<AnimatePresence mode='wait' custom={direction}>
				<motion.div
					key={location.pathname}
					custom={direction}
					variants={variants}
					initial='enter'
					animate='center'
					exit='exit'
					transition={{
						duration: 0.3,
						ease: "easeInOut",
					}}
					className='w-full p-6 md:p-10'>
					<Routes location={location}>
						<Route path='/' element={<AboutPage />} />
						<Route path='/projects' element={<ProjectPage />}>
							<Route path='todo' element={<ToDoList />} />
						</Route>
					</Routes>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
