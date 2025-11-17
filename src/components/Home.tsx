import { Footer } from "./Footer";
import { NavBar } from "./Nav";
import { PageTransition } from "./PageTransition";

export const Home = () => {
	return (
		<div className='bg-primary-gradient min-h-screen flex flex-col'>
			<NavBar />
			<div className='flex-1'>
				<PageTransition />
			</div>
			<Footer />
		</div>
	);
};
