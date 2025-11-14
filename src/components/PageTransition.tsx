import { useLocation, Routes, Route } from "react-router-dom";
import { useEffect, useState, useTransition } from "react";
import { AboutPage } from "../pages/About";
import { ProjectPage } from "../pages/Projects";
import { ToDoList } from "../pages/ToDoList";

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

	// Use React 19's useTransition to mark navigation updates as non-urgent
	// This keeps the UI responsive during page transitions
	const [isPending, startTransition] = useTransition();

	// Track the location that's currently being displayed (may lag behind during transitions)
	// This allows us to keep the old page visible while animating out
	const [displayLocation, setDisplayLocation] = useState(location);

	// Track whether we're in the "entering" or "exiting" phase of the animation
	// Note: Currently set but not used in rendering - available for future enhancements
	const [_transitionStage, setTransitionStage] = useState<
		"entering" | "exiting"
	>("entering");

	// Track the slide direction: "right" = forward (slide in from right), "left" = backward (slide in from left)
	const [direction, setDirection] = useState<"left" | "right">("right");

	useEffect(() => {
		// Get the numeric order of the current route and the previously displayed route
		// Default to 0 if route is not in ROUTE_ORDER (fallback for unknown routes)
		const currentOrder = ROUTE_ORDER[location.pathname] ?? 0;
		const prevOrder = ROUTE_ORDER[displayLocation.pathname] ?? 0;

		// Determine slide direction:
		// - If moving to a higher-numbered route (e.g., About → Projects), slide right (forward)
		// - If moving to a lower-numbered route (e.g., Projects → About), slide left (backward)
		const newDirection = currentOrder > prevOrder ? "right" : "left";
		setDirection(newDirection);

		// If the route has changed, trigger the exit animation
		// The old page will animate out, then onExited() will be called to update displayLocation
		// Wrap in startTransition to mark this as a non-urgent update
		if (location.pathname !== displayLocation.pathname) {
			startTransition(() => {
				setTransitionStage("exiting");
			});
		}
	}, [location, displayLocation, startTransition]);

	// Called when the exit animation completes
	// This updates displayLocation to match the current location, which triggers the enter animation
	// Wrap in startTransition to mark this as a non-urgent update
	const onExited = () => {
		startTransition(() => {
			setDisplayLocation(location); // Now displayLocation matches location
			setTransitionStage("entering"); // Start the enter animation
		});
	};

	// Check if we're currently in the middle of a transition
	// During transition: location has changed but displayLocation hasn't updated yet
	const isTransitioning = location.pathname !== displayLocation.pathname;

	return (
		<div
			className={`page-transition-container ${
				isPending ? "transition-pending" : ""
			}`}
			aria-busy={isPending}>
			{/* Previous page (exiting) - only rendered during transition */}
			{/* This div contains the old page content and animates it out */}
			{isTransitioning && (
				<div
					className={`page-transition page-transition-${direction} page-transition-exiting`}
					onAnimationEnd={() => {
						// When exit animation finishes, update displayLocation and start enter animation
						onExited();
					}}>
					{/* Render the old page using displayLocation (the route we're leaving) */}
					<Routes location={displayLocation}>
						<Route path='/' element={<AboutPage />} />
						<Route path='/projects' element={<ProjectPage />}>
							<Route path='todo' element={<ToDoList />} />
						</Route>
					</Routes>
				</div>
			)}

			{/* Current page (entering) - always rendered */}
			{/* This div contains the new page content and animates it in */}
			<div
				className={`page-transition page-transition-${direction} ${
					// Only apply entering animation class if we're transitioning
					// If not transitioning, the page is already visible (no animation needed)
					isTransitioning ? "page-transition-entering" : ""
				} p-6 md:p-10`}>
				{/* Render the new page using location (the route we're navigating to) */}
				<Routes location={location}>
					<Route path='/' element={<AboutPage />} />
					<Route path='/projects' element={<ProjectPage />}>
						<Route path='todo' element={<ToDoList />} />
					</Route>
				</Routes>
			</div>
		</div>
	);
};
