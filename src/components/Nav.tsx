import { useTheme } from "../context/themeProvider";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const NavBar = () => (
	<div className='flex items-center h-16 px-6 w-full'>
		<div className='flex-1'></div>
		<div className='flex justify-center items-center gap-8 flex-1'>
			<NavLink name='Home' />
			<NavLink name='About' />
			<NavLink name='Projects' />
			<NavLink name='Contact' />
		</div>
		<div className='flex-1 flex justify-end'>
			<DarkToggle />
		</div>
	</div>
);

interface NavLinkProps {
	name: string;
}

const NAVMAP = {
	Home: "/",
	About: "/about",
	Projects: "/projects",
	Contact: "/contact",
};

const NavLink = ({ name }: NavLinkProps) => {
	const nav = useNavigate();

	const handleClick = () => {
		const route = NAVMAP[name as keyof typeof NAVMAP];
		if (route) {
			nav(route);
		}
	};

	return (
		<button
			className='text-3xl text-gray-800 dark:text-gray-200 hover:cursor-pointer'
			onClick={handleClick}>
			<span className='underline-animation'>{name}</span>
		</button>
	);
};

const MoonIcon = () => (
	<FaMoon className='text-gray-800 hover:cursor-pointer hover:transition-colors duration-300 hover:text-gray-500' />
);

const SunIcon = () => (
	<MdWbSunny className='text-gray-200 hover:cursor-pointer hover:transition-colors duration-300 hover:text-gray-500' />
);

const DarkToggle = () => {
	const { toggleTheme, darkMode } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
			{darkMode ? <SunIcon /> : <MoonIcon />}
		</button>
	);
};
