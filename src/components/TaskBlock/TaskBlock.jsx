import './task-block.scss';

const TaskBlock = (props) => {
	const { task, startTime, endTime } = props;
	
    return (
        <div className='task-block'>
            <div className='task-details'>
                <div className='task-name'>{task}</div>
                <div className='task-time'>
                    {startTime} - {endTime}
                </div>
            </div>
        </div>
    )
}

export default TaskBlock;