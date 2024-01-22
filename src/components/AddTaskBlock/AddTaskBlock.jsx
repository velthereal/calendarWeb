import './add-task-block.scss';

import Input from '../Input';
import Button from '../Button';

import { useState, useEffect  } from 'react';

import { v4 as uuidv4 } from 'uuid';

const AddTaskBlock = (props) => {
	const { formattedDate, onAddTask, openModalFunc } = props; 
	// formattedDate - передана дата з TasksSection
	// onAddTask - передана функція для додавання завдання
	// openModalFunc - для передевання булевого значення чи відкрите модальне вікно чи ні

	const [selectedDate, setSelectedDate] = useState(formattedDate); // для обирання дати в Input
	const [task, setTask] = useState(''); // для вводу завдання в Input
	const [startTime, setStartTime] = useState(''); // для вводу часу початку завдання в Input
	const [endTime, setEndTime] = useState(''); // для вводу часу кінця завдання в Input
	const [isImportant, setIsImportant] = useState(false); // для визнечення важливості
	const [error, setError] = useState('');

	const [isStartTimeValid, setIsStartTimeValid] = useState(true);
	const [isEndTimeValid, setIsEndTimeValid] = useState(true);


	useEffect(() => {
        if (formattedDate) {
			setSelectedDate(formattedDate); //.toISOString().slice(0, 10)
		}
    }, [formattedDate]); // код визначає, що коли formattedDate змінюється, ми оновлюємо selectedDate відповідно

	const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    }; // функція для зміни дати через Input
	const onGetTask = (value) => {
		setError('');
		setTask(value);
	}; // функція для вводу завдання через Input
	const onGetStartTime = (value) => {
		setStartTime(value);
	}; // функція для вводу часу початку завдання через Input
	const onGetEndTime = (value) => {
		setEndTime(value);
	}; // функція для вводу часу кінця завдання через Input

	const handleAddTask = () => {
		if(!dateToInput || !task || !startTime || !endTime) {
			setError('Please fill in all required fields');
			return;
		}

		
		const startDateTime = new Date(`${dateToInput}T${startTime}`);
		const endDateTime = new Date(`${dateToInput}T${endTime}`);
		const timeDifference = (endDateTime - startDateTime) / (1000 * 60);

		if(timeDifference < 10) {
			setError('End time must be at least 10 minutes after start time.');
			return;
		}

		setError('');
		const newTask = {
			date: dateToInput,
			taskName: task,
			startTime,
			endTime,
			isImportant,
			taskId: uuidv4(),
		}; // об'єкт з даними для додавання завдання
		onAddTask(newTask); // передана функція для додавання завдання
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		const updatedTasks = [...storedTasks, newTask];
		localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // додає в localStorage завдання

		onAddTask(newTask);
		openModalFunc(false); // для закриття вікна після нажаття на кнопку для додавання завдання
	}; // функція для нажаття кнопки, після цього - додавання завдання

	const handleEndTimeChange = (newEndTime) => {
		setEndTime(newEndTime);
		setError('');

		const startDateTime = new Date(`${dateToInput}T${startTime}`);
		const endDateTime = new Date(`${dateToInput}T${newEndTime}`);
		const timeDifference = (endDateTime - startDateTime) / (1000 * 60);

		setIsEndTimeValid(timeDifference >= 10);
	}

	const year = selectedDate.getFullYear();
	const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
	const day = String(selectedDate.getDate()).padStart(2, '0');

	const dateToInput = `${year}-${month}-${day}`;

	const handleStartTimeChange = (newStartTime) => {
        setStartTime(newStartTime);
        setError('');
    };

	return (
			<div className='add-task'>  
				<h4>New Task</h4>
				<Input
					type='date'
					value={dateToInput}
					onChangeFunction={handleDateChange} />
				<br />
				<Input
					value={task}
					placeholder='Enter New Task'
					onChangeFunction={onGetTask} />
				<br />
				<Input
					value={startTime}
					label='From:'
					type='time'
					onChangeFunction={handleStartTimeChange} />
				<Input
					value={endTime}
					label='To:'
					type='time'
					onChangeFunction={handleEndTimeChange} />
				{!isEndTimeValid && <p className='error-message'>End time must be at least 10 minutes after start time.</p>}
				<br />
				<Button
					title='Add Task'
					onClickFunction={handleAddTask} />
				{error && <p className='error-message'>{error}</p>}
			</div>
	)
}

export default AddTaskBlock;