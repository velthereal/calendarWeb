import './calendar.scss';

import { useState } from 'react';

const Calendar = () => {
	const [sDate, setsDate] = useState(new Date());

   	const findMonthDays = (y, m) => {
      	return new Date(y, m + 1, 0).getDate();
   	};
   	const findFirstDay = (y, m) => {
      	return new Date(y, m, 1).getDay();
   	};
   	const changeToPrevMonth = () => {
      	setsDate((pDate) => {
        	const pMonth = pDate.getMonth() - 1;
        	const pYear = pDate.getFullYear();
        	return new Date(pYear, pMonth);
      	});
   	};
   	const changeToNextMonth = () => {
      	setsDate((pDate) => {
         	const nMonth = pDate.getMonth() + 1;
        	const nYear = pDate.getFullYear();
        	return new Date(nYear, nMonth);
      	});
   	};

   	const handleDateClick = (date) => {
      	setsDate(date);
   	};
   	const showCalendar = () => {
      	// const currDate = new Date();
      	const y = sDate.getFullYear();
      	const m = sDate.getMonth();
      	const mDays = findMonthDays(y, m);
      	const fDay = findFirstDay(y, m);

      	const allDays = [];

      	// For empty cells
       	for (let p = 0; p < fDay; p++) {
         	allDays.push(<div key={`em-${p}`} className="day-box empty"></div>);
      	}

      	// Show actual days
      	for (let d = 1; d <= mDays; d++) {
         	const date = new Date(y, m, d);
         	const isSelected = sDate && date.toDateString() === sDate.toDateString();

         	allDays.push(
            	<div
               		key={`d-${d}`}
               		className={`day-box ${isSelected ? "selected" : ""}`}
               		onClick={() => handleDateClick(date)}>
               		{d}
            	</div>
         	);
      	}

      	return allDays;
   	};

	return (
		<div className='wrapper'>
			<div className="calendar">
		   		<div className="month-year">
					<button onClick={changeToPrevMonth}><i className="fa-solid fa-caret-left"></i></button>
					<h2>
						{sDate.toLocaleString("default", {
							month: "long",
							year: "numeric",
						})}
					</h2>
					<button onClick={changeToNextMonth}><i className="fa-solid fa-caret-right"></i></button>
		   		</div>
		   		<div className="days">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
					{showCalendar()}
				</div>
			 	{/* {sDate && (
				 	<div className="selected-date">
						Selected Date: {sDate.toLocaleDateString()}
				 	</div>
			  	)} */}
		   	</div>
			<div className='page1'></div>
			<div className='page2'></div>
		</div>
	 );
}

export default Calendar;