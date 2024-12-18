import PropTypes from "prop-types";

export default function MyFAB({
	icon,
	bgColor,
	border = false,
	borderColor = "",
	onClick,
}) {
	return (
		<div
			className={`py-3.5 px-4 rounded-full inline-flex place-content-center shadow-md cursor-pointer ${
				border && `border-2 border-[${borderColor}]`
			}`}
			onClick={onClick}
      style={{
        backgroundColor: bgColor,
        borderWidth: '1.35px'
      }}
		>
			{icon}
		</div>
	);
}

MyFAB.propTypes = {
	icon: PropTypes.element,
	bgColor: PropTypes.string,
	border: PropTypes.bool,
	borderColor: PropTypes.string,
	onClick: PropTypes.func,
};
