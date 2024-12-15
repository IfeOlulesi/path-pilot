import PropTypes from 'prop-types';

const PathPilotLogoMini = ({ color = 'white' }) => (
  <svg
    width="23"
    height="26"
    viewBox="0 0 23 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H19.74L22.68 2.94V11.34L19.32 14.7H9.66V24.36H12.18V25.62H0V24.36H2.52V11.34H15.12V13.02L20.16 7.56L15.12 2.1V3.78H2.52V1.26H0V0Z"
      fill={color}
    />
  </svg>
);

export default PathPilotLogoMini;

PathPilotLogoMini.propTypes = {
  color: PropTypes.string
};
