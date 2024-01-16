import './calendar.scss';

const Calendar = (props) => {
	const { sDate, onDateChange } = props;

   	const findMonthDays = (y, m) => {
      	return new Date(y, m + 1, 0).getDate();
   	};
   	const findFirstDay = (y, m) => {
      	return new Date(y, m, 1).getDay();
   	};
   	const changeToPrevMonth = () => {
		onDateChange((pDate) => {
        	const pMonth = pDate.getMonth() - 1;
        	const pYear = pDate.getFullYear();
        	return new Date(pYear, pMonth);
      	});
   	};
   	const changeToNextMonth = () => {
		onDateChange((pDate) => {
         	const nMonth = pDate.getMonth() + 1;
        	const nYear = pDate.getFullYear();
        	return new Date(nYear, nMonth);
      	});
   	};

   	const handleDateClick = (date) => {
		onDateChange(date);
   	};
	const showDaysOfWeek = () => {
		const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return daysOfWeek.map(day => <div className='daysName' key={day}>{ day }</div>)
	}
   	const showCalendar = () => {
      	const y = sDate.getFullYear();
      	const m = sDate.getMonth();
      	const mDays = findMonthDays(y, m);
      	const fDay = findFirstDay(y, m);

      	const allDays = [];

		for(let p = fDay - 1; p >= 0; p--){
			const prevMonth = m === 0 ? 11 : m - 1;
			const prevMonthDays = findMonthDays(y, prevMonth);
			const date = new Date(y, prevMonth, prevMonthDays - p);
			allDays.push(
				<div
					key={`p-${p}`}
					className={`day-box from-prev-month`}
					onClick={() => handleDateClick(date)}>
						{prevMonthDays - p}
					</div>
			)
		}

		for(let d = 1; d <= mDays; d++){
			const date = new Date(y, m, d);
			const isSelected = sDate && date.toDateString() === sDate.toDateString();

			allDays.push(
				<div
					key={`d-${d}`}
					className={`day-box ${isSelected ? 'selected' : ''}`}
					onClick={() => handleDateClick(date)}>
						{d}
					</div>
			)
		}

		let nextMonthDay = 1;
		const remainingDays = 42 - (fDay + mDays);
		for(let n = 0; n < remainingDays; n++){
			const nextMonth = m === 11 ? m : 1;
			const date = new Date(y, nextMonth, nextMonthDay);
			allDays.push(
				<div
					key={`n-${n}`}
					className={`day-box from-next-month`}
					onClick={() => handleDateClick(date)}>
						{nextMonthDay}
				</div>
			);
			nextMonthDay++;
		}
      	return allDays;
   	};

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