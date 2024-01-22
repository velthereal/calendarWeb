import './tasks-section.scss';

import TaskBlock from '../TaskBlock';
import Modal from '../Modal';
import AddTaskBlock from '../AddTaskBlock';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TasksSection = (props) => {
	const { sDate } = props; // sDate - передана дата з Main

	// для форматування дати ----
	const year1 = sDate.getFullYear();
	const month1 = String(sDate.getMonth() + 1).padStart(2, '0');
	const day1 = String(sDate.getDate()).padStart(2, '0');
	const dateFromLS = `${year1}-${month1}-${day1}`;
	// ----

	const [showModal, setShowModal] = useState(false); // для відображення модального вікна з AddTaskBlock
	const [tasks, setTasks] = useState([]); // масив завдань

	const onShowModal = () => {
		setShowModal(true);
	} // функція яка міняє статус закритого модального вікна для AddTaskBlock

	const formatOrdinal = (n) => {
		const suffixes = ["th", "st", "nd", "rd"];
		const v = n % 100;
		return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	}; // функція для додавання суфіксу до порядкового числа
	const formattedDate = sDate ? `${formatOrdinal(sDate.getDate())} ${sDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })}` : ''; // функція для форматування дати у формат : 20th January 2024
	const weekday = sDate ? sDate.toLocaleDateString('en-US', {
		weekday: 'long'
	}) : ''; // функція для отримання дня тижня

	const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    }; // функція для додавання завдання

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks); // встановлює в tasks завдання з storedTasks
	}, []); // завантажує з localStorage записані завдання
	const getTasksForDateFromLocalStorage = (date) => {
		const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		return allTasks.filter(task => task.date === date); // перевіряє, чи властивість date об'єкта task дорівнює значенню date
	}; // бере записані завдання з localStorage
	const showTasksForDate = () => {
		const tasksForDate = getTasksForDateFromLocalStorage(dateFromLS); // завдання для певної дати
		const storedTasks = tasksForDate.sort((a, b) => {
			const timeA = new Date(`${dateFromLS} ${a.startTime}`);
			const timeB = new Date(`${dateFromLS} ${b.startTime}`);
			return timeA - timeB;
		});
		return tasksForDate.map(task => (
			<TaskBlock
				key={uuidv4()}
				taskId={task.taskId}
				task={task.taskName}
				startTime={task.startTime}
				endTime={task.endTime}
				isImportant={task.isImportant} />
		)); // виводить дані в блок завдання
	}; // показує завдання
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
			<i class="fa-regular fa-square-plus" onClick={() => onShowModal()}></i>
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