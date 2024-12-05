/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";

export default function Cell({ xPos, yPos, type, onClick }) {
	const color = useMemo(() => {
		switch (type) {
			case "wall":
				return "#1f2937";
			case "start":
				return "#22c55e";
			case "end":
				return "#ef4444";
			case "path":
				return "#3b82f6";
			case "visited":
				return "#93c5fd";
			default:
				return "#ffffff";
		}
	}, [type]);

	return (
		<Rect
			x={xPos}
			y={yPos}
			width={20}
			height={20}
			fill={color}
			onClick={onClick}
      stroke={'black'}
      strokeWidth={0.2}
		/>
	);
}

Cell.propTypes = {
	xPos: PropTypes.number.isRequired,
	yPos: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
