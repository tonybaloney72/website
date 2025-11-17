import { useState, useRef, useEffect } from "react";
import { useTheme, type Theme } from "../context/themeProvider.tsx";
import { motion } from "motion/react";

export const ThemeSelector = () => {
	const { theme, setTheme, themes } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const getThemeLabel = (themeName: Theme) => {
		return themeName.charAt(0).toUpperCase() + themeName.slice(1);
	};

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center px-2 rounded-lg bg-secondary border border-border text-primary hover:opacity-80 transition-opacity hover:cursor-pointer'
				title='Select Theme'>
				<span className='sm:inline text-sm md:text-base'>
					{getThemeLabel(theme)}
				</span>
			</button>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					className='absolute right-0 mt-2 w-30 md:w-48 rounded-lg shadow-lg bg-secondary border border-border z-50 overflow-hidden'>
					{themes.map(themeOption => (
						<button
							key={themeOption}
							onClick={() => {
								setTheme(themeOption);
								setIsOpen(false);
							}}
							className={`w-full flex items-center gap-3 px-4 py-3 text-left text-primary hover:bg-opacity-50 transition-colors ${
								theme === themeOption ? "bg-accent bg-opacity-20" : ""
							} hover:cursor-pointer hover:bg-accent-secondary`}>
							<span>{getThemeLabel(themeOption)}</span>
							{theme === themeOption && <span className='ml-auto'>✓</span>}
						</button>
					))}
				</motion.div>
			)}
		</div>
	);
};
