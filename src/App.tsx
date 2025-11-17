import { NavBar } from "./components/Nav.tsx";
import { PageTransition } from "./components/PageTransition.tsx";
import { Footer } from "./components/Footer.tsx";
import { ThemeProvider } from "./context/themeProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<BrowserRouter basename='/website'>
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
