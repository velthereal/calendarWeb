import './main.scss';

import Calendar from '../Calendar';
import TasksSection from '../TasksSection';

import { useState } from 'react';

const Main = () => {
	const [sDate, setsDate] = useState(new Date());

	const handleDateChange = (newDate) => {
		setsDate(newDate);
	}

	return (
		<div className='content'>
			<Calendar
				sDate={sDate}
				onDateChange={handleDateChange} />
			<TasksSection
				sDate={sDate} />
		</div>
	)
}

export default Main;