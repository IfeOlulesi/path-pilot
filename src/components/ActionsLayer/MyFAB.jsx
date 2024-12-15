import PropTypes from 'prop-types';

export default function MyFAB({ icon }) {
	return (
		<div className="bg-red-500/25 w-full h-full">
			{icon}
		</div>
	);
}

MyFAB.propTypes = {
	icon: PropTypes.element
};