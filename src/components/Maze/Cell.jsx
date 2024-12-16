/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";

export default function Cell({ xPos, yPos, type, onClick }) {
const isMouseDown = useRef(false);

	const color = useMemo(() => {
		switch (type) {
			case "wall":
				return "#1f2937";
			case "begin":
				return "#22c55e";
			case "finish":
				return "#ef4444";
			case "path":
				return "#3b82f6";
			case "visited":
				return "#93c5fd";
			default:
				return "#ffffff";
		}
	}, [type]);

	const handleMouseDown = () => {
    isMouseDown.current = true; 
	};

	const handleMouseUp = () => {
    isMouseDown.current = false; 
	};

	const handleMouseEnter = (event) => {

    if (event.evt.buttons === 1) { 
      // 1 indicates the primary button (usually the left button) is pressed
      onClick();
    } 
	};

	return (
		<Rect
			x={xPos}
			y={yPos}
			width={20}
			height={20}
			fill={color}
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseEnter={handleMouseEnter}
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
