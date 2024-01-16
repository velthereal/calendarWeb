const Button = (props) => {
	const { type, title, onClickFunction } = props;

	return (
		<button
			type={type || 'button'}
			onClick={() => onClickFunction && onClickFunction()}>
			{title}
		</button>
	)
}

export default Button;