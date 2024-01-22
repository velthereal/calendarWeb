import './calendar.scss';

const Calendar = (props) => {
	const { sDate, onDateChange } = props; // sDate - дата з Main, onDateChange - функція для зміни дати з Main

   	const findMonthDays = (y, m) => {
      	return new Date(y, m + 1, 0).getDate();
   	}; // функція для знаходження дня місяця
   	const findFirstDay = (y, m) => {
      	return new Date(y, m, 1).getDay();
   	}; // функція для знаходження дня тижня
	const hasTasksForDate = (date) => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // знаходить завдання в localStorage
  		const tasksForDate = storedTasks.filter(task => task.date === date); // створює масив з датами, на які є завдання
  		return tasksForDate.length > 0; // повертає true/false
	}; // функція для визначення чи є заплановані завдання на дату
   	const changeToPrevMonth = () => {
		onDateChange((pDate) => {
        	const pMonth = pDate.getMonth() - 1;
        	const pYear = pDate.getFullYear();
        	return new Date(pYear, pMonth);
      	});
   	}; // функція для перегортання календаря на попередній місяць
   	const changeToNextMonth = () => {
		onDateChange((pDate) => {
         	const nMonth = pDate.getMonth() + 1;
        	const nYear = pDate.getFullYear();
        	return new Date(nYear, nMonth);
      	});
   	}; // функція для перегортання календаря на наступний місяць
   	const handleDateClick = (date) => {
		onDateChange(date);
   	}; // функція для натискання на певний день календаря
	const showDaysOfWeek = () => {
		const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return daysOfWeek.map(day => <div className='daysName' key={day}>{ day }</div>); // повертає масив з назвами днів тижня
	}; // функція для виведення днів тижня
   	const showCalendar = () => {
      	const y = sDate.getFullYear(); // рік
      	const m = sDate.getMonth(); // місяць
      	const mDays = findMonthDays(y, m); // к-сть днів в місяці
      	const fDay = findFirstDay(y, m); // на який день тижня припадає перший день місяця

      	const allDays = []; //  масив з всіма днями календаря

		for(let p = fDay - 1; p >= 0; p--){
			const prevMonth = m === 0 ? 11 : m - 1; // перевіряє який попередній місць
			const prevMonthDays = findMonthDays(y, prevMonth); // перевіряє к-сть днів попереднього місяця
			const date = new Date(y, prevMonth, prevMonthDays - p);
			// для відформатованої дати ----
			const year3 = date.getFullYear();
			const month3 = String(date.getMonth() + 1).padStart(2, '0');
			const day3 = String(date.getDate()).padStart(2, '0');
			const $date = `${year3}-${month3}-${day3}`;
			// ----
			allDays.push(
				<div
					key={`p-${p}`}
					className={`day-box from-prev-month`}
					onClick={() => handleDateClick(date)}>
						{prevMonthDays - p}
						{hasTasksForDate($date) && <span className="task-indicator"></span>}
					</div>
			); // створюється масив блоків-днів для попереднього місяця
		} // цикл для створення попереднього місяця

		for(let d = 1; d <= mDays; d++){
			const date = new Date(y, m, d);
			const isSelected = sDate && date.toDateString() === sDate.toDateString(); // перевіряє чи натиснутий день і чи є він сьогоднішнім
			// для відформатованої дати ----
			const year3 = date.getFullYear();
			const month3 = String(date.getMonth() + 1).padStart(2, '0');
			const day3 = String(date.getDate()).padStart(2, '0');
			const $date = `${year3}-${month3}-${day3}`;
			// ----
			allDays.push(
				<div
					key={`d-${d}`}
					className={`day-box ${isSelected ? 'selected' : ''}`}
					onClick={() => handleDateClick(date)}>
						{d}
						{hasTasksForDate($date) && <span className="task-indicator"></span>}
					</div>
			); // створюється масив блоків-днів для поточного місяця
		} // цикл для створення поточного місяця

		let nextMonthDay = 1;
		const remainingDays = 42 - (fDay + mDays);
		for(let n = 0; n < remainingDays; n++){
			const nextMonth = m === 11 ? m : 1; // перевіряє який наступний місяць
			const date = new Date(y, nextMonth, nextMonthDay);
			// для форматування дати ----
			const year3 = date.getFullYear();
			const month3 = String(date.getMonth() + 1).padStart(2, '0');
			const day3 = String(date.getDate()).padStart(2, '0');
			const $date = `${year3}-${month3}-${day3}`;
			// ----
			allDays.push(
				<div
					key={`n-${n}`}
					className={`day-box from-next-month`}
					onClick={() => handleDateClick(date)}>
						{nextMonthDay}
						{hasTasksForDate($date) && <span className="task-indicator"></span>}
				</div>
			);
			nextMonthDay++;
		} // цикл для створення наступного місяця
      	return allDays;
   	}; // функція для виведення всього календаря

	return (
		<div className='wrapper'>
			<div className="calendar">
		   		<div className="month-year">
					<button onClick={changeToPrevMonth}><i className="fa-solid fa-caret-left"></i></button>
					<h2>
						{sDate.toLocaleString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</h2>
					<button onClick={changeToNextMonth}><i className="fa-solid fa-caret-right"></i></button>
		   		</div>
		   		<div className="days">
					{showDaysOfWeek()}
					{showCalendar()}
				</div>
		   	</div>
			<div className='page1'></div>
			<div className='page2'></div>
		</div>
	 );
}

export default Calendar;