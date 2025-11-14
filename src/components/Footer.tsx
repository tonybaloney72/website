export const Footer = () => {
	const handleClick = () => {
		window.open("https://calendar.app.google/oMTaVdUCsHsF7CXc6", "_blank");
	};

	return (
		<div
			onClick={handleClick}
			className='text-lg text-primary h-24 p-4 flex w-full justify-center'>
			<p className='hover:cursor-pointer hover:text-accent hover:transition duration-300'>
				Click here to schedule a meeting with me!
			</p>
		</div>
	);
};
