import { useTheme } from "../context/themeProvider";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

export const NavBar = () => (
	<div className='flex justify-center items-center gap-8 h-16 px-6'>
		<NavLink name='Home' />
		<NavLink name='About' />
		<NavLink name='Projects' />
		<NavLink name='Contact' />
		<DarkToggle />
	</div>
);

interface NavLinkProps {
	name: string;
}

const NavLink = ({ name }: NavLinkProps) => (
	<button className='text-2xl text-gray-800 dark:text-gray-200 hover:cursor-pointer'>
		<span className='underline-animation'>{name}</span>
	</button>
);

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
