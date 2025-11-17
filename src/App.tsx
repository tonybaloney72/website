import { ThemeProvider } from "./context/themeProvider.tsx";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home.tsx";

function App() {
	return (
		<HashRouter>
			<ThemeProvider>
				<Home />
			</ThemeProvider>
		</HashRouter>
	);
}

export default App;
