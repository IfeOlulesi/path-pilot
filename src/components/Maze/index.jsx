import { Canvas } from "@react-three/fiber";
import Cell from "./Cell";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import MazeLights from "./MazeLights";
import MazePlane from "./MazePlane";
import { useCallback, useEffect, useMemo } from "react";
import { useAppStore } from "../../store";

export default function Maze() {
	const { mazeRows, mazeCols, mazeData, updateCell, currentTool } =
		useAppStore();

	useEffect(() => {
		if (mazeData.length === 0) {
			useAppStore.getState().initializeMaze();
		}
	}, []);

	const ROW_ADJUSTMENT_FACTOR = 9.5;
	const COL_ADJUSTMENT_FACTOR = 14.5;

	const handleCellClick = useCallback(
		(row, col) => {
			// console.log("Handling click of cell: ", `${row}, ${col}`);
			updateCell(row, col, { type: "wall" });
		},
		[updateCell]
	);

	const cells = useMemo(() => {
		const cellsArray = [];

		for (let row = 0; row < mazeRows; row++) {
			const adjustedRowValue = row - ROW_ADJUSTMENT_FACTOR;
			const rowArr = [];

			for (let col = 0; col < mazeCols; col++) {
				const adjustedColValue = col - COL_ADJUSTMENT_FACTOR;
				const cellPos = [adjustedColValue, 0, adjustedRowValue];
				const cellData = mazeData[row]?.[col];

				if (cellData) {
					rowArr.push(
						<Cell
							type={cellData.type}
							position={cellPos}
							key={`${row}-${col}`}
							onClick={(e) => {
								e.stopPropagation();
								// handleCellClick(row, col);
							}}
						/>
					);
				}
			}
			cellsArray.push(rowArr);
		}
		return cellsArray;
	}, [mazeRows, mazeCols, mazeData]);

	return (
		<div id="canvas-container" className="bg-[#F9FAFB] h-full w-full flex">
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 25, 0]} />
				<OrbitControls
					enabled={false}
					enableDamping
					dampingFactor={0.05}
					screenSpacePanning={false}
					maxPolarAngle={Math.PI / 2.5}
					minDistance={15}
					maxDistance={50}
				/>
				<MazeLights />
				<MazePlane />
				{cells}
			</Canvas>
		</div>
	);
}
