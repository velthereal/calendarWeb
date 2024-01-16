import './tasks-section.scss';

import TaskBlock from '../TaskBlock';
import Modal from '../Modal';

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
		<div className='add-task'>  
        	<h4>New Task</h4>
			<input type="date" />
			<input type="text" placeholder='Enter New Task' />
			<label htmlFor="">
				From:
				<input type="time" />
			</label>
			<label htmlFor="">
				To:
				<input type="time" />
			</label>
			<button type='button'>Add Task</button>
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

			<Modal showModal={showModal} openModalFunc={setShowModal} >
                {modalContent}
            </Modal>
		</div>
	)
}

export default TasksSection;