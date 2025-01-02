/* eslint-disable react/no-unknown-property */
import { memo, useRef } from "react";
import { Rect } from "react-konva";
import { useAppStore } from "@/store";
import { cells } from "@/utils/constants";
import { KonvaEventObject } from "konva/lib/Node";

const Cell = ({ xPos, yPos, row, col, onClick }: CellProps) => {
	const isMouseDown = useRef(false);
	const CELL_WIDTH = useAppStore((state) => state.CELL_WIDTH);
	const visualizationRunning = useAppStore(
		(state) => state.visualizationRunning
	);

  // INFO: These 2 lines make the cell performance great for mouse interactions
	const cellData = useAppStore((state) => state.mazeData[row]?.[col]);
	const cellColor =
		cells[cellData?.type?.toLowerCase() as keyof typeof cells]?.color ||
		"white";


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
			fill={cellColor}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseEnter={handleMouseEnter}
			stroke={"black"}
			strokeWidth={0.2}
		/>
	);
};

export const MemoizedCell = memo(Cell);

export default Cell;

interface CellProps {
	xPos: number;
	yPos: number;
	row: number;
	col: number;
	onClick: () => void;
}
