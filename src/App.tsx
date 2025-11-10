import { NavBar } from "./components/Nav";
import { ThemeProvider } from "./context/themeProvider";
import "./App.css";

function App() {
	return (
		<ThemeProvider>
			<div className='bg-gray-200 dark:bg-gray-800 min-h-screen'>
				<NavBar />
				<div></div>
			</div>
		</ThemeProvider>
	);
}

export default App;
//test
