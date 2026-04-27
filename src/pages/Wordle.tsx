import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUndo } from "react-icons/fa";
import { WORD_LIBRARY } from "../data/wordleWords.ts";

const WORD_LENGTH = 5;
const MAX_GUESSES = 5;

type LetterStatus = "correct" | "present" | "absent" | "empty";
type GameState = "playing" | "won" | "lost";

const getRandomWord = (): string =>
	WORD_LIBRARY[Math.floor(Math.random() * WORD_LIBRARY.length)];

const evaluateGuess = (guess: string, target: string): LetterStatus[] => {
	const statuses: LetterStatus[] = Array(WORD_LENGTH).fill("absent");
	const targetChars = target.split("");
	const used = Array(WORD_LENGTH).fill(false);

	for (let i = 0; i < WORD_LENGTH; i += 1) {
		if (guess[i] === targetChars[i]) {
			statuses[i] = "correct";
			used[i] = true;
		}
	}

	for (let i = 0; i < WORD_LENGTH; i += 1) {
		if (statuses[i] === "correct") continue;

		const presentIndex = targetChars.findIndex(
			(char, index) => !used[index] && char === guess[i],
		);

		if (presentIndex !== -1) {
			statuses[i] = "present";
			used[presentIndex] = true;
		}
	}

	return statuses;
};

export const Wordle = () => {
	const nav = useNavigate();
	const [targetWord, setTargetWord] = useState<string>(getRandomWord);
	const [guesses, setGuesses] = useState<string[]>([]);
	const [currentGuess, setCurrentGuess] = useState<string>("");
	const [error, setError] = useState<string>("");

	const gameState: GameState = useMemo(() => {
		if (guesses.length > 0 && guesses[guesses.length - 1] === targetWord) {
			return "won";
		}
		if (guesses.length >= MAX_GUESSES) {
			return "lost";
		}
		return "playing";
	}, [guesses, targetWord]);

	const rows = useMemo(() => {
		return Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
			const guess = guesses[rowIndex] ?? "";
			const isCurrentRow = rowIndex === guesses.length && gameState === "playing";
			const displayWord = isCurrentRow ? currentGuess : guess;
			const statuses =
				guess.length === WORD_LENGTH
					? evaluateGuess(guess, targetWord)
					: Array(WORD_LENGTH).fill("empty");

			return Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
				return {
					letter: displayWord[colIndex]?.toUpperCase() ?? "",
					status: statuses[colIndex] as LetterStatus,
				};
			});
		});
	}, [currentGuess, gameState, guesses, targetWord]);

	const handleGuessChange = (value: string) => {
		if (gameState !== "playing") return;
		const cleanedValue = value
			.toLowerCase()
			.replace(/[^a-z]/g, "")
			.slice(0, WORD_LENGTH);
		setCurrentGuess(cleanedValue);
		setError("");
	};

	const submitGuess = () => {
		if (gameState !== "playing") return;

		if (currentGuess.length < WORD_LENGTH) {
			setError("Enter a full 5-letter word.");
			return;
		}

		setGuesses(prev => [...prev, currentGuess]);
		setCurrentGuess("");
		setError("");
	};

	const handleReset = () => {
		setTargetWord(getRandomWord());
		setGuesses([]);
		setCurrentGuess("");
		setError("");
	};

	const getCellClass = (status: LetterStatus): string => {
		if (status === "correct") {
			return "bg-green-600 border-green-600 text-white";
		}
		if (status === "present") {
			return "bg-yellow-500 border-yellow-500 text-white";
		}
		if (status === "absent") {
			return "bg-tertiary border-border text-secondary";
		}
		return "bg-secondary border-border text-primary";
	};

	return (
		<div className='w-full flex flex-col items-center gap-6'>
			<div className='flex items-center w-full relative max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px]'>
				<button
					onClick={() => nav("/projects")}
					className='flex gap-2 text-sm sm:text-base md:text-lg bg-secondary text-primary items-center px-2 py-1 rounded-lg hover:opacity-80 transition-opacity hover:cursor-pointer'>
					<FaArrowLeft /> Back
				</button>
				<h1 className='text-xl sm:text-2xl md:text-3xl text-primary absolute left-1/2 transform -translate-x-1/2'>
					Wordle
				</h1>
			</div>

			<div className='w-full max-w-[320px] sm:max-w-[420px] flex flex-col gap-3'>
				{rows.map((row, rowIndex) => (
					<div key={`row-${rowIndex}`} className='grid grid-cols-5 gap-2'>
						{row.map((cell, cellIndex) => (
							<div
								key={`cell-${rowIndex}-${cellIndex}`}
								className={`h-14 rounded-md border-2 flex items-center justify-center text-xl font-bold uppercase transition-all duration-300 ${getCellClass(
									cell.status,
								)}`}>
								{cell.letter}
							</div>
						))}
					</div>
				))}
			</div>

			<div className='w-full max-w-[320px] sm:max-w-[420px] flex flex-col gap-3'>
				<input
					type='text'
					value={currentGuess}
					onChange={e => handleGuessChange(e.target.value)}
					onKeyDown={e => e.key === "Enter" && submitGuess()}
					disabled={gameState !== "playing"}
					placeholder='Type a 5-letter word'
					className='w-full px-3 py-2 border-2 rounded-lg border-border text-primary bg-secondary focus:outline-none focus:border-accent transition-colors disabled:opacity-60'
				/>
				<div className='flex gap-2'>
					<button
						onClick={submitGuess}
						disabled={gameState !== "playing"}
						className='flex-1 bg-accent text-bg-secondary px-3 py-2 rounded-lg hover:bg-accent-secondary transition-colors hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'>
						Submit Guess
					</button>
					<button
						onClick={handleReset}
						className='bg-secondary text-primary px-3 py-2 rounded-lg border border-border hover:bg-tertiary transition-colors hover:cursor-pointer'>
						<FaUndo />
					</button>
				</div>
				{error && <p className='text-sm text-accent'>{error}</p>}
			</div>

			{gameState === "won" && (
				<p className='text-lg text-accent font-semibold'>
					You won! Nice solve.
				</p>
			)}
			{gameState === "lost" && (
				<p className='text-lg text-secondary font-semibold'>
					No more guesses. The word was{" "}
					<span className='text-primary'>{targetWord.toUpperCase()}</span>.
				</p>
			)}
		</div>
	);
};
