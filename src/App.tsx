import { NavBar } from "./components/Nav.tsx";
import { PageTransition } from "./components/PageTransition.tsx";
import { Footer } from "./components/Footer.tsx";
import { ThemeProvider } from "./context/themeProvider.tsx";
import { HashRouter } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<HashRouter>
			<ThemeProvider>
				<div className='bg-primary-gradient min-h-screen flex flex-col'>
					<NavBar />
					<div className='flex-1'>
						<PageTransition />
					</div>
					<Footer />
				</div>
			</ThemeProvider>
		</HashRouter>
	);
}

export default App;
