import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";

export type Theme = "light" | "dark" | "blue" | "green" | "purple" | "orange";

export const THEMES: Theme[] = [
	"light",
	"dark",
	"blue",
	"green",
	"purple",
	"orange",
];

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("theme") as Theme;
		return savedTheme && THEMES.includes(savedTheme) ? savedTheme : "dark";
	});

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
			{children}
		</ThemeContext.Provider>
	);
};
