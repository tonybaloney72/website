import { useNavigate, useLocation } from "react-router-dom";
import { ThemeSelector } from "./ThemeSelector";

export const NavBar = () => (
	<div className='flex items-center h-16 px-6 w-full'>
		<div className='flex-1'></div>
		<div className='flex justify-center items-center gap-8 flex-1'>
			<NavLink name='About' />
			<NavLink name='Projects' />
			<NavLink name='Contact' />
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
	Contact: "/contact",
};

const NavLink = ({ name }: NavLinkProps) => {
	const nav = useNavigate();
	const location = useLocation();
	const route = NAVMAP[name as keyof typeof NAVMAP];
	const isActive = location.pathname === route;

	const handleClick = () => {
		if (route) {
			nav(route);
		}
	};

	return (
		<button
			className='text-3xl text-theme-primary hover:cursor-pointer'
			onClick={handleClick}>
			<span className={`underline-animation ${isActive ? "active" : ""}`}>
				{name}
			</span>
		</button>
	);
};
