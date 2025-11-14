import { NavBar } from "./components/Nav";
import { ThemeProvider } from "./context/themeProvider";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PageTransition } from "./components/PageTransition";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<div className='bg-primary min-h-screen'>
					<NavBar />
					<PageTransition />
				</div>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
