import './task-block.scss';

import { useState } from 'react';

const TaskBlock = (props) => {
	const { task, startTime, endTime, isImportant, taskId } = props; // task, startTime, endTime - дані, які були записані в localStorage в компоненті TasksSection

	const [isTaskImportant, setIsTaskImportant] = useState(isImportant); // оголошення стану длч позначення важливості елементу

    const toggleImportance = () => {
        setIsTaskImportant(!isTaskImportant);

        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    	const updatedTasks = storedTasks.map((t) =>
      		t.taskId === taskId
        	? { ...t, isImportant: !isTaskImportant }
        	: t
    	);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
	const onDeleteTask = () => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		const updatedTasks = storedTasks.filter((t) =>  !(t.taskId=== taskId));
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	};
	
    return (
        <div className={`task-block ${isImportant ? 'important' : ''}`}>
            <div className='task-details'>
                <div>
					<div className='task-name'>{task}</div>
					<div className='task-time'>
						{startTime} - {endTime}
					</div>
				</div>
				<i class={isTaskImportant ? "fa-solid fa-star" : 'fa-regular fa-star'} onClick={toggleImportance}></i>
				<i class="fa-solid fa-trash" onClick={onDeleteTask}></i>
            </div>
        </div>
    )
}

export default TaskBlock;