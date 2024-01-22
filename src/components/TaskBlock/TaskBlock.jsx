import './task-block.scss';

import { useState } from 'react';

const TaskBlock = (props) => {
	const { task, startTime, endTime, isImportant } = props; // task, startTime, endTime - дані, які були записані в localStorage в компоненті TasksSection

	const [isTaskImportant, setIsTaskImportant] = useState(isImportant);

    const toggleImportance = () => {
        setIsTaskImportant(!isTaskImportant);

        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = storedTasks.map((t) =>
            t.taskName === task && t.startTime === startTime && t.endTime === endTime
                ? { ...t, isImportant: !isTaskImportant }
                : t
        );
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
				
            </div>
        </div>
    )
}

export default TaskBlock;