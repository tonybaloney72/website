import { NavBar } from "./components/Nav";
import { ThemeProvider } from "./context/themeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { ProjectPage } from "./pages/Projects";
import { ContactPage } from "./pages/Contact";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<div className='bg-theme-primary min-h-screen'>
					<NavBar />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/projects' element={<ProjectPage />} />
						<Route path='/contact' element={<ContactPage />} />
					</Routes>
				</div>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
