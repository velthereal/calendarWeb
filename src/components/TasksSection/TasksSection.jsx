import './tasks-section.scss';

import TaskBlock from '../TaskBlock';
import Modal from '../Modal';
import AddTaskBlock from '../AddTaskBlock';

import { useState, useEffect } from 'react';

const TasksSection = (props) => {
	const { sDate } = props;

	const [tasks, setTasks] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks);
	}, []);
	const getTasksForDateFromLocalStorage = (date) => {
		const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		return allTasks.filter(task => task.date === date);
	}
	const showTasksForDate = () => {
		const tasksForDate = getTasksForDateFromLocalStorage(sDate.toISOString().slice(0, 10));
		return tasksForDate.map(task => (
			<TaskBlock
				key={task.startTime}
				task={task.taskName}
				startTime={task.startTime}
				endTime={task.endTime} />
		))
	}

	const formatOrdinal = (n) => {
		const suffixes = ["th", "st", "nd", "rd"];
		const v = n % 100;
		return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	};
	const formattedDate = sDate ? `${formatOrdinal(sDate.getDate())} ${sDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })}` : '';
	const weekday = sDate ? sDate.toLocaleDateString('en-US', {
		weekday: 'long'
	}) : '';

	const onShowDeleteModal = () => {
		setShowModal(true);
	}

	const getTasksForDate = (date) => {
        return tasks.filter(task => task.date === date.toISOString().slice(0, 10));
    };
	const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    };

	return(
		<div className='day-tasks'>
			{sDate && (
                <div className='date'>
                    <h2 className="weekday">
                        {weekday}
                    </h2>
                    <p className="selected-date">
                        {formattedDate}
                    </p>
                </div>
            )}
			{showTasksForDate()}
			<i class="fa-regular fa-square-plus" onClick={() => onShowDeleteModal()}></i>

			<Modal showModal={showModal} openModalFunc={setShowModal} >
                <AddTaskBlock
					formattedDate={sDate}
					onAddTask={addTask}
					openModalFunc={setShowModal} />
            </Modal>
		</div>
	)
}

export default TasksSection;