import Cell from './Cell'
import { useCallback, useEffect, useMemo } from "react";
import { useAppStore } from "@/store";

import { Stage, Layer } from "react-konva";

export default function Maze() {
	const { 
		mazeData,
    currentTool,
		updateCell,
		DRAWER_WIDTH,
		NAVBAR_HEIGHT,
		CELL_WIDTH,
    STATUS_BAR_HEIGHT,
    initializeMaze,
	} = useAppStore();

  const MAZE_WIDTH = window.innerWidth - DRAWER_WIDTH;
  const MAZE_HEIGHT = window.innerHeight - NAVBAR_HEIGHT - STATUS_BAR_HEIGHT;

  const mazeRows = Math.floor(MAZE_HEIGHT / CELL_WIDTH);
  const mazeCols = Math.floor(MAZE_WIDTH / CELL_WIDTH) ;
  
	useEffect(() => {
    if (mazeData.length === 0) {
      initializeMaze();
		}
	}, [mazeData.length, initializeMaze]);
  
	const handleCellClick = useCallback(
    (row, col) => {
			updateCell(row, col, { type: currentTool });
		},
		[updateCell, currentTool]
	);

	const cells = useMemo(() => {
    const cellsArray = [];
    
		for (let row = 0; row < mazeRows; row++) {
			const adjustedRowValue = row * CELL_WIDTH;
			const rowArr = [];

			for (let col = 0; col < mazeCols; col++) {
				const adjustedColValue = col * CELL_WIDTH;
				const xPos = adjustedColValue;
				const yPos = adjustedRowValue;
				const cellData = mazeData[row]?.[col];

				if (cellData) {
					rowArr.push(
						<Cell
							type={cellData.type}
							xPos={xPos}
							yPos={yPos}
							key={`${row}-${col}`}
							onClick={() => {
								handleCellClick(row, col);
							}}
						/>
					);
				}
			}
			cellsArray.push(rowArr);
		}
		return cellsArray;
	}, [mazeRows, mazeCols, mazeData, handleCellClick, CELL_WIDTH]);

	return (
		<div
			id="canvas-container"
			className="bg-[#F9FAFB] w-full flex items-center justify-center"
		>
			<Stage
				width={MAZE_WIDTH}
				height={MAZE_HEIGHT}
			>
				<Layer on>{cells}</Layer>
			</Stage>
		</div>
	);
}
