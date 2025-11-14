import { NavBar } from "./components/Nav";
import { ThemeProvider } from "./context/themeProvider";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PageTransition } from "./components/PageTransition";
import { Footer } from "./components/Footer";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<div className='bg-primary min-h-screen flex flex-col'>
					<NavBar />
					<div className='flex-1'>
						<PageTransition />
					</div>
					<Footer />
				</div>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
