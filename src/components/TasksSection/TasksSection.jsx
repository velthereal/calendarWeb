import './tasks.scss';

import TaskBlock from '../TaskBlock';
import AddTask from '../AddTask';

import { useState } from 'react';

const TasksSection = (props) => {
	const { sDate } = props;

	const [showModal, setShowModal] = useState(false)

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

	const modalContent = (
		<div>  
        	<p>You really want to delete it?</p>
    	</div>
	);

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
			<TaskBlock />
			<i class="fa-regular fa-square-plus" onClick={() => onShowDeleteModal()}></i>

			<AddTask showModal={showModal} openModalFunc={setShowModal} >
                {modalContent}
            </AddTask>
		</div>
	)
}

export default TasksSection;