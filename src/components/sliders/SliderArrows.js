export const Arrow = ({ icon, onClick, className, text }) => {
	const ClickEvent = () => {
		onClick();
	};
	return (
		<button type='button' className={className} onClick={ClickEvent}>
			<i className={icon} />
			{text && <span>{text}</span>}
		</button>
	);
};
