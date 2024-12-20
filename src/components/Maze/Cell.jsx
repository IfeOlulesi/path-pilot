/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";
import { useAppStore } from "@/store";
import { cells } from "@/utils/constants";

export default function Cell({ xPos, yPos, type, onClick }) {
	const isMouseDown = useRef(false);
	const { CELL_WIDTH } = useAppStore();

	// const color = useMemo(() => {
	// 	switch (type) {
	// 		case cells.wall.name:
	// 			return cells.wall.color;
	// 		case cells.begin.name:
	// 			return cells.begin.color;
	// 		case cells.finish.name:
	// 			return cells.finish.color;
	// 		case cells.path.name:
	// 			return cells.path.color;
	// 		case cells.visited.name:
	// 			return cells.visited.color;
	// 		default:
	// 			return cells.default.color;
	// 	}
	// }, [type]);

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
			width={CELL_WIDTH}
			height={CELL_WIDTH}
			fill={cells[type].color}
			onClick={onClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseEnter={handleMouseEnter}
			stroke={"black"}
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
