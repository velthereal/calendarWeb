const Input = (props) => {
	const { label, type, value, validation, placeholder, onChangeFunction } = props;

	const inputClass = validation ? '' : 'errorInput';

	return (
		<label>
			{label}
			<input
				type={type || 'text'}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChangeFunction(event.target.value)}
				className={inputClass} />
		</label>
	)
}

export default Input;