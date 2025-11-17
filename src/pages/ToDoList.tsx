import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeProvider.tsx";
import { motion, AnimatePresence } from "motion/react";
import {
	FaTrashAlt,
	FaCheck,
	FaUndo,
	FaSortAmountDown,
	FaSortAmountUp,
} from "react-icons/fa";

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

export const ToDoList = () => {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos = localStorage.getItem("tonyBaloneyToDos");
		if (savedTodos) {
			try {
				const parsed = JSON.parse(savedTodos) as Todo[];
				return Array.isArray(parsed) ? parsed : [];
			} catch {
				return [];
			}
		}
		return [];
	});
	const [newTodo, setNewTodo] = useState<string>("");
	const [newTodoId, setNewTodoId] = useState<number | null>(null);
	const [_deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
	const [sortNewestFirst, setSortNewestFirst] = useState<boolean>(() => {
		const savedSort = localStorage.getItem("tonyBaloneyToDoSort");
		return savedSort ? savedSort === "newest" : false; // Default to oldest first
	});

	useEffect(() => {
		localStorage.setItem("tonyBaloneyToDos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		localStorage.setItem(
			"tonyBaloneyToDoSort",
			sortNewestFirst ? "newest" : "oldest",
		);
	}, [sortNewestFirst]);

	useEffect(() => {
		// Remove animation class after animation completes
		if (newTodoId !== null) {
			const timer = setTimeout(() => {
				setNewTodoId(null);
			}, 300); // Match animation duration
			return () => clearTimeout(timer);
		}
	}, [newTodoId]);

	const addTodo = (): void => {
		if (newTodo.trim()) {
			const newId = Date.now();
			setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
			setNewTodoId(newId);
			setNewTodo("");
		}
	};

	const deleteTodo = (id: number): void => {
		// Start exit animation
		setDeletingTodoId(id);
		// Remove from state after animation completes
		setTimeout(() => {
			setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
			setDeletingTodoId(null);
		}, 300); // Match animation duration
	};

	const toggleComplete = (id: number): void => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const nav = useNavigate();
	const { theme } = useTheme();

	const handleBack = (): void => {
		nav("/projects");
	};

	const toggleSortOrder = (): void => {
		setSortNewestFirst(!sortNewestFirst);
	};

	// Sort todos based on user preference
	const sortedTodos = [...todos].sort((a, b) => {
		// If one is completed and the other isn't, uncompleted comes first
		if (a.completed !== b.completed) {
			return a.completed ? 1 : -1;
		}
		// Within the same completion status, sort by id
		// If sortNewestFirst is true: descending (newest first)
		// If sortNewestFirst is false: ascending (oldest first)
		return sortNewestFirst ? b.id - a.id : a.id - b.id;
	});

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='flex items-center w-full relative'>
				<button
					onClick={handleBack}
					className='bg-secondary text-primary items-center px-2 py-1 rounded-lg hover:opacity-80 transition-opacity hover:cursor-pointer'>
					Back
				</button>
				<h1 className='text-3xl text-primary absolute left-1/2 transform -translate-x-1/2'>
					To Do List
				</h1>
			</div>
			<div className='flex gap-4 pt-4 w-[320px] sm:w-[480px] md:w-[640px] lg:w-[800px] justify-center items-center'>
				<input
					type='text'
					value={newTodo}
					onChange={e => setNewTodo(e.target.value)}
					onKeyDown={e => e.key === "Enter" && addTodo()}
					className={`md:w-[300px] lg:w-[400px] pl-2 py-1 border-2 rounded border-border focus:outline-none focus:border-accent transition-colors ${
						theme !== "light" ? "bg-text-primary" : "bg-secondary"
					}`}
				/>
				<button
					onClick={addTodo}
					className='text-bg-secondary px-4 py-2 bg-accent hover:bg-accent-secondary hover:transition duration-300 hover:cursor-pointer rounded-lg'>
					Add To-Do
				</button>
				<button
					onClick={toggleSortOrder}
					className='text-primary hover:text-accent hover:transition duration-300 hover:cursor-pointer p-2'
					title={sortNewestFirst ? "Newest first" : "Oldest first"}>
					{sortNewestFirst ? <FaSortAmountDown /> : <FaSortAmountUp />}
				</button>
			</div>
			<ul className='flex flex-col gap-2 text-lg text-primary pt-4 w-[320px] sm:w-[480px] md:w-[640px] lg:w-[800px]'>
				<AnimatePresence mode='popLayout'>
					{sortedTodos.map(todo => (
						<motion.li
							key={todo.id}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, x: -100 }}
							className={`w-full flex justify-between ${
								newTodoId === todo.id ? "todo-enter" : ""
							}`}>
							<p className={todo.completed ? "line-through text-tertiary" : ""}>
								{todo.text}
							</p>
							<div className='flex gap-4'>
								<button
									className={`hover:text-bg-secondary hover:cursor-pointer hover:transition duration-300 ${
										todo.completed ? "text-tertiary" : ""
									}`}
									onClick={() => deleteTodo(todo.id)}>
									<FaTrashAlt />
								</button>
								<button
									className={`hover:cursor-pointer hover:transition duration-300 ${
										todo.completed
											? "hover:text-accent-secondary text-tertiary"
											: "hover:text-accent"
									}`}
									onClick={() => toggleComplete(todo.id)}>
									{todo.completed ? <FaUndo /> : <FaCheck />}
								</button>
							</div>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	);
};
