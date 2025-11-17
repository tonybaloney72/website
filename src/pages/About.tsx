import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import pensive_carribean from "../assets/pensive_carribean.jpg";
import beignets from "../assets/beignets.jpg";
import bowtie from "../assets/bowtie.jpg";
import hike_look from "../assets/hike_look.jpg";
import ice_cream from "../assets/ice_cream.jpg";
import resumePDF from "../assets/Anthony Bologna Resume.pdf";

export const AboutPage = () => {
	// Array of images to cycle through
	const images = [pensive_carribean, beignets, bowtie, hike_look, ice_cream];

	// Calculate initial random image index
	const initialImageIndex = Math.floor(Math.random() * images.length);

	// State to track current image index - start with random image
	const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
	const [isHovering, setIsHovering] = useState(false);

	// State to control hint animation - only animate on first visit
	const [shouldAnimateHint, setShouldAnimateHint] = useState(() => {
		const hasShown = localStorage.getItem("hintAnimationShown");
		return hasShown !== "true";
	});

	// Track touch positions for swipe detection
	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);
	const minSwipeDistance = 50;

	const numMap = {
		1: "https://www.linkedin.com/in/anthony-michael-bologna/",
		2: "https://github.com/tonybaloney72",
		3: resumePDF,
	} as const;

	// Desktop: wheel scroll to cycle through images
	const handleWheel = (e: React.WheelEvent) => {
		if (!isHovering) return;

		e.preventDefault();

		// Scroll down = next image, scroll up = previous image
		let newIndex: number;
		if (e.deltaY > 0) {
			// Scrolling down - next image
			newIndex = (currentImageIndex + 1) % images.length;
		} else {
			// Scrolling up - previous image
			newIndex = (currentImageIndex - 1 + images.length) % images.length;
		}

		setCurrentImageIndex(newIndex);
	};

	// Mobile: touch handlers for swipe gestures
	const onTouchStart = (e: React.TouchEvent) => {
		touchEndX.current = null; // Reset
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const onTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.targetTouches[0].clientX;
	};

	const onTouchEnd = () => {
		if (!touchStartX.current || !touchEndX.current) return;

		const distance = touchStartX.current - touchEndX.current;

		if (Math.abs(distance) > minSwipeDistance) {
			let newIndex: number;
			if (distance > 0) {
				// Swipe left = next image
				newIndex = (currentImageIndex + 1) % images.length;
			} else {
				// Swipe right = previous image
				newIndex = (currentImageIndex - 1 + images.length) % images.length;
			}

			setCurrentImageIndex(newIndex);
		}
	};

	// Fallback: tap to cycle (for accessibility and simple interaction)
	const handleImageClick = () => {
		// Only trigger on tap if no significant swipe occurred
		// This prevents accidental clicks during swipe
		if (touchStartX.current && touchEndX.current) {
			const swipeDistance = Math.abs(touchStartX.current - touchEndX.current);
			if (swipeDistance < minSwipeDistance) {
				const newIndex = (currentImageIndex + 1) % images.length;
				setCurrentImageIndex(newIndex);
			}
		} else {
			// If no touch interaction, allow click to cycle
			const newIndex = (currentImageIndex + 1) % images.length;
			setCurrentImageIndex(newIndex);
		}
	};

	const handleClick = (num: number) => {
		const url = numMap[num as keyof typeof numMap];

		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<div className='flex flex-col gap-10 items-center'>
			<div className='flex flex-col items-center md:flex-row md:items-stretch justify-center gap-6 md:gap-12 max-w-[1280px] h-[480px]'>
				<div className='w-1/2 h-full'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onWheel={handleWheel}
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
						onClick={handleImageClick}
						className='max-w-[360px] min-w-[180px] hover:border-2 border-accent-secondary overflow-hidden relative cursor-pointer touch-none md:touch-auto h-fit w-full'>
						<AnimatePresence mode='wait'>
							<motion.img
								key={currentImageIndex}
								src={images[currentImageIndex]}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className='w-full h-auto object-cover pointer-events-none'
								draggable={false}
							/>
						</AnimatePresence>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='text-md text-secondary text-center px-3 py-1.5 rounded-lg bg-secondary/50 backdrop-blur-sm'>
						<motion.span
							animate={
								shouldAnimateHint
									? {
											y: [0, -5, 0],
									  }
									: { y: 0 }
							}
							transition={{
								duration: 1.5,
								repeat: shouldAnimateHint ? 3 : 0,
								ease: "easeInOut",
								onComplete: () => {
									if (shouldAnimateHint) {
										setShouldAnimateHint(false);
										localStorage.setItem("hintAnimationShown", "true");
									}
								},
							}}
							className='inline-block bg-tertiary px-2 py-1 rounded-lg'>
							Scroll or tap to change the image
						</motion.span>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
					className='text-primary max-w-[360px] flex flex-col items-center md:items-start'>
					<p className='text-3xl md:text-4xl text-accent-tertiary'>
						Anthony Bologna
					</p>
					<p className='text-2xl md:text-3xl text-accent'>
						Full Stack Engineer
					</p>
					<p className='text-xl md:text-2xl pt-1 md:pt-3'>Hello!</p>
					<p className='text-lg md:text-xl text-center md:text-left'>
						I am a software developer who is passionate about both User and
						Developer experience who works tirelessly to create user friendly
						webistes. With an eye for detail, a desire to grow, and a passion to
						build products that help people in their day to day life; I believe
						I can contribute at a high level to any team - no matter the
						challenge. me on.
					</p>
					<div className='mt-auto flex text-4xl gap-8 pt-2 md:pt-0'>
						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.96 }}
							transition={{ duration: 0.2 }}>
							<FaLinkedin
								className='hover:text-accent hover:cursor-pointer hover:transition duration-300'
								onClick={() => handleClick(1)}
							/>
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.96 }}
							transition={{ duration: 0.2 }}>
							<FaGithub
								className='hover:text-accent hover:cursor-pointer hover:transition duration-300'
								onClick={() => handleClick(2)}
							/>
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.96 }}
							transition={{ duration: 0.2 }}>
							<FaFileDownload
								className='hover:text-accent hover:cursor-pointer hover:transition duration-300'
								onClick={() => handleClick(3)}
								title='Download Resume'
							/>
						</motion.button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
