import { useNavigate } from "react-router-dom";

export const ToDoList = () => {
	const nav = useNavigate();

	const handleBack = () => {
		nav("/projects");
	};
	return <div onClick={handleBack}>hello</div>;
};
