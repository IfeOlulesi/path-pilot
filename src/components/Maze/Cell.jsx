/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from "react";
import { Rect } from "react-konva";
import PropTypes from "prop-types";
import { useAppStore } from "@/store";
import { tools } from "@/utils/constants";

export default function Cell({ xPos, yPos, type, onClick }) {
	const isMouseDown = useRef(false);
	const { CELL_WIDTH } = useAppStore();

	const color = useMemo(() => {
		switch (type) {
			case tools.wall:
				return "#1f2937";
			case tools.begin:
				return "#22c55e";
			case tools.finish:
				return "#ef4444";
			case tools.path:
				return "#3b82f6";
			case tools.visited:
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
			width={CELL_WIDTH}
			height={CELL_WIDTH}
			fill={color}
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
