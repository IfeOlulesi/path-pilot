/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Rect } from "react-konva";
import { useAppStore } from "@/store";
import { cells } from "@/utils/constants";
import { KonvaEventObject } from "konva/lib/Node";

export default function Cell({ xPos, yPos, type, onClick }: CellProps) {
	const isMouseDown = useRef(false);
	const { CELL_WIDTH, visualizationRunning } = useAppStore();

	const handleMouseDown = () => {
		if (!visualizationRunning) {
			isMouseDown.current = true;
			onClick();
		}
	};

	const handleMouseUp = (event: KonvaEventObject<MouseEvent>) => {
		isMouseDown.current = false;
	};

	const handleMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
		if (event.evt.buttons === 1 && !visualizationRunning) {
			// 1 indicates the primary button (usually the left button) is pressed
			if (!visualizationRunning) {
				onClick();
			}
		}
	};

	return (
		<Rect
			x={xPos}
			y={yPos}
			width={CELL_WIDTH}
			height={CELL_WIDTH}
			fill={cells[type.toLowerCase() as keyof typeof cells].color}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseEnter={handleMouseEnter}
			stroke={"black"}
			strokeWidth={0.2}
		/>
	);
}

interface CellProps {
	xPos: number;
	yPos: number;
	type: string;
	onClick: () => void;
}
