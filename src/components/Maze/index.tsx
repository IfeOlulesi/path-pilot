import Cell from "./Cell";
import { useCallback, useEffect, useMemo } from "react";
import { useAppStore } from "@/store";
import { cells as cellTypes } from "@/utils/constants";

import { Stage, Layer } from "react-konva";

export default function Maze() {
	const {
		mazeData,
		CELL_WIDTH,
		currentTool,
		DRAWER_WIDTH,
		NAVBAR_HEIGHT,
		STATUS_BAR_HEIGHT,
		updateCell,
		initializeMaze,
	} = useAppStore();

	debugger;
	const MAZE_WIDTH = window.innerWidth - DRAWER_WIDTH;
	const MAZE_HEIGHT = window.innerHeight - NAVBAR_HEIGHT - STATUS_BAR_HEIGHT;

	const mazeRows = Math.floor(MAZE_HEIGHT / CELL_WIDTH);
	const mazeCols = Math.floor(MAZE_WIDTH / CELL_WIDTH);

	// Calculate adjusted maze width and height
	const adjustedMazeWidth = mazeCols * CELL_WIDTH;
	const adjustedMazeHeight = mazeRows * CELL_WIDTH;

	useEffect(() => {
		if (mazeData.length === 0) {
			initializeMaze();
		}
	}, [mazeData.length, initializeMaze]);

	const handleCellClick = useCallback(
		(row: number, col: number) => {
			if (currentTool === "Eraser") {
				updateCell(row, col, { type: cellTypes.default.name });
				return;
			}
			updateCell(row, col, { type: currentTool.toLowerCase() });
		},
		[updateCell, currentTool]
	);

	const cells = useMemo(() => {
		const cellsArray = [];

		for (let row = 0; row < mazeRows; row++) {
			const rowArr = [];
			const adjustedRowValue = row * CELL_WIDTH;

			for (let col = 0; col < mazeCols; col++) {
				rowArr.push(
					<Cell
						row={row}
						col={col}
						xPos={col * CELL_WIDTH}
						yPos={adjustedRowValue}
						key={`${row}-${col}`}
						onClick={() => handleCellClick(row, col)}
					/>
				);
			}
			cellsArray.push(rowArr);
		}
		return cellsArray;
	}, [mazeRows, mazeCols, handleCellClick, CELL_WIDTH]);

	return (
		<div
			id="canvas-container"
			className="bg-[#F9FAFB] w-full flex items-center justify-center"
		>
			<Stage width={adjustedMazeWidth} height={adjustedMazeHeight}>
				<Layer on>{cells}</Layer>
			</Stage>
		</div>
	);
}
