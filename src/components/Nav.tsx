import { useNavigate, useLocation } from "react-router-dom";
import { useTransition } from "react";
import { ThemeSelector } from "./ThemeSelector.tsx";

export const NavBar = () => (
	<div className='flex items-center h-16 md:h-24 p-2 md:p-6 w-full'>
		<div className='md:flex flex-1 text-secondary text-lg'>
			<span className='hidden sm:block'>Anthony Bologna</span>
		</div>
		<div className='flex justify-center items-center gap-4 md:gap-8 flex-1'>
			<NavLink name='About' />
			<NavLink name='Projects' />
		</div>
		<div className='flex-1 flex justify-end items-center gap-2 md:gap-4'>
			<HintToggleButton />
			<ThemeSelector />
		</div>
	</div>
);

interface NavLinkProps {
	name: string;
}

const NAVMAP = {
	About: "/",
	Projects: "/projects",
};

const NavLink = ({ name }: NavLinkProps) => {
	const nav = useNavigate();
	const location = useLocation();
	const [isPending, startTransition] = useTransition();
	const route = NAVMAP[name as keyof typeof NAVMAP];
	const isActive =
		location.pathname === route || location.pathname.includes(route + "/");

	const handleClick = () => {
		if (route) {
			// Wrap navigation in startTransition to mark it as a non-urgent update
			// This works seamlessly with PageTransition's useTransition
			startTransition(() => {
				nav(route);
			});
		}
	};

	return (
		<button
			className='text-xl md:text-3xl text-primary hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
			onClick={handleClick}
			disabled={isPending && !isActive}>
			<span className={`underline-animation ${isActive ? "active" : ""}`}>
				{name}
			</span>
		</button>
	);
};

const HintToggleButton = () => {
	const toggleHint = () => {
		const current =
			localStorage.getItem("imageCarouselHintDismissed") === "true";
		localStorage.setItem("imageCarouselHintDismissed", (!current).toString());
		window.dispatchEvent(new Event("hintToggle"));
	};

	return (
		<button
			onClick={toggleHint}
			className='text-lg md:text-xl text-secondary hover:text-accent hover:cursor-pointer transition-colors duration-300'
			title='Toggle hint'>
			Toggle Hint
		</button>
	);
};
