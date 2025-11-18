export const Footer = () => {
	const handleClick = () => {
		window.open("https://calendar.app.google/oMTaVdUCsHsF7CXc6", "_blank");
	};

	return (
		<div
			onClick={handleClick}
			className='text-sm md:text-lg text-primary h-12 md:h-24 p-2 md:p-4 flex w-full justify-center items-center'>
			<p className='hover:cursor-pointer hover:text-accent hover:transition duration-300 text-center'>
				Click here to schedule a meeting with me!
			</p>
		</div>
	);
};
