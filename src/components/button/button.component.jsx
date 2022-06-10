import './button.styles.scss';

const ButtonTypeClasses = {
	google: 'google-authentication',
	inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
	return (
		<button
			className={`${ButtonTypeClasses[buttonType]} button-container`}
			{...otherProps}
		>
			{children}
		</button>
	);
}

export default Button
