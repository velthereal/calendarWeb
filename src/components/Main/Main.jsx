import './main.scss';

import Calendar from '../Calendar';
import TasksSection from '../TasksSection';

import { useState } from 'react';

const Main = () => {
	const [sDate, setsDate] = useState(new Date()); // оголошення стану сьогоднішньої дати

	const handleDateChange = (newDate) => {
		setsDate(newDate);
	}; // функція для зміни дати при натисканні

	return (
		<main>
			<Calendar
				sDate={sDate}
				onDateChange={handleDateChange} />
			<TasksSection
				sDate={sDate} />
		</main>
	)
}

export default Main;