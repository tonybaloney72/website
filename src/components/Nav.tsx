import { useNavigate, useLocation } from "react-router-dom";
import { useTransition } from "react";
import { ThemeSelector } from "./ThemeSelector";

export const NavBar = () => (
	<div className='flex items-center h-24 p-6 w-full'>
		<div className='flex-1 text-theme-secondary text-xl'>Anthony Bologna</div>
		<div className='flex justify-center items-center gap-8 flex-1'>
			<NavLink name='About' />
			<NavLink name='Projects' />
		</div>
		<div className='flex-1 flex justify-end'>
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
	const isActive = location.pathname === route;

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
			className='text-3xl text-theme-primary hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
			onClick={handleClick}
			disabled={isPending && !isActive}>
			<span className={`underline-animation ${isActive ? "active" : ""}`}>
				{name}
			</span>
		</button>
	);
};
