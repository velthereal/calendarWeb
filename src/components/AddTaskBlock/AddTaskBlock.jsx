import './add-task-block.scss';

import Input from '../Input';
import Button from '../Button';

import { useState, useEffect  } from 'react';

const AddTaskBlock = (props) => {
	const { formattedDate, onAddTask, openModalFunc } = props;

	const [selectedDate, setSelectedDate] = useState('');
	const [task, setTask] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	useEffect(() => {
        setSelectedDate(formattedDate ? formattedDate.toISOString().slice(0, 10) : '');
    }, [formattedDate]);

	const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

	const handleAddTask = () => {
		const newTask = {
			date: selectedDate,
			taskName: task,
			startTime,
			endTime,
		}
		onAddTask(newTask);
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		const updatedTasks = [...storedTasks, newTask];
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));

		onAddTask(newTask);
		openModalFunc(false);
	}

	const onGetTask = (value) => {
		setTask(value);
	}
	const onGetStartTime = (value) => {
		setStartTime(value);
	}
	const onGetEndTime = (value) => {
		setEndTime(value);
	}
	return (
			<div className='add-task'>  
				<h4>New Task</h4>
				<Input
					type='date'
					value={selectedDate}
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
					onChangeFunction={onGetStartTime} />
				<Input
					value={endTime}
					label='To:'
					type='time'
					onChangeFunction={onGetEndTime} />
				<br />
				<Button
					title='Add Task'
					onClickFunction={handleAddTask} />
			</div>
	)
}

export default AddTaskBlock;