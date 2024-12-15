import PropTypes from 'prop-types';

export default function MyFAB({ icon, color, border = false, borderColor = "", onClick }) {
	return (
		<div className={`bg-[${color}] py-3.5 px-4 rounded-full inline-flex place-content-center shadow-md cursor-pointer ${border && `border-2 border-[${borderColor}]`}`} onClick={onClick}>
			{icon}
		</div>
	);
}

MyFAB.propTypes = {
	icon: PropTypes.element,
	color: PropTypes.string,
	border: PropTypes.bool,
	borderColor: PropTypes.string,
	onClick: PropTypes.func
};