import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import pensive_carribean from "../assets/pensive_carribean.jpg";
import resumePDF from "../assets/Anthony Bologna Resume.pdf";

export const AboutPage = () => {
	const handleClick = (num: number) => {
		const numMap = {
			1: "https://www.linkedin.com/in/anthony-michael-bologna/",
			2: "https://github.com/tonybaloney72",
			3: resumePDF,
		} as const;

		const url = numMap[num as keyof typeof numMap];

		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<div className='flex flex-col gap-10 items-center'>
			<div className='flex flex-col items-center md:flex-row md:items-stretch justify-center px-6 py-4 md:py-8 gap-6 md:gap-12 max-w-[1280px]'>
				<img
					src={pensive_carribean}
					className='w-1/2 max-w-[360px] min-w-[180px] border-2 border-(--accent-hover)'
				/>
				<div className='text-theme-primary max-w-[360px] flex flex-col items-center md:items-start'>
					<p className='text-3xl md:text-4xl text-(--accent)'>
						Anthony Bologna
					</p>
					<p className='text-2xl md:text-3xl text-(--accent-hover)'>
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
						<FaLinkedin
							className='hover:text-(--accent) hover:cursor-pointer'
							onClick={() => handleClick(1)}
						/>
						<FaGithub
							className='hover:text-(--accent) hover:cursor-pointer'
							onClick={() => handleClick(2)}
						/>
						<FaFileDownload
							className='hover:text-(--accent) hover:cursor-pointer'
							onClick={() => handleClick(3)}
							title='Download Resume'
						/>
					</div>
				</div>
			</div>
			{/* <div className='flex justify-center px-6 py-8 gap-12 max-w-[1280px]'>
				<p className='text-3xl text-theme-primary'>
					<FaLongArrowAltDown />
				</p>
			</div> */}
		</div>
	);
};
