import './main.scss';

import Calendar from '../Calendar';
import TasksSection from '../TasksSection';

import { useState } from 'react';

const Main = () => {
	const [sDate, setsDate] = useState(new Date()); // оголошення стану сьогоднішньої дати

	const handleDateChange = (newDate) => {
		setsDate(newDate);
	}; // функція для зиіни дати при натисканні

	return (
		<main>
			<div className='content'>
				<Calendar
					sDate={sDate}
					onDateChange={handleDateChange} />
				<TasksSection
					sDate={sDate} />
			</div>
		</main>
	)
}

export default Main;