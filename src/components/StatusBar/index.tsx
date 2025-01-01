import { useAppStore } from "@/store";
import { cells } from "@/utils/constants";
import theme from "@/utils/theme";
import { useEffect, useState } from "react";

function StatusBar() {
	return (
		<div
			className={`flex flex-row py-0.5 px-4 justify-between text-white text-xs`}
			style={{
				backgroundColor: theme.lightMode.primary,
			}}
		>
			<LeftContent />
			<RightContent />
		</div>
	);
}

export default StatusBar;

function LeftContent() {
	const cellsArr = Object.keys(cells) as Array<keyof typeof cells>;
	return (
		<div className="flex flex-row gap-4">
			{cellsArr.map((cell: keyof typeof cells, index) => (
				<div key={index} className="flex items-center gap-2">
					<div
						className={`w-3.5 h-3.5`}
						style={{ backgroundColor: cells[cell].color }}
					></div>
					<div>{cell} </div>
				</div>
			))}
		</div>
	);
}

function RightContent() {
	const {
		currentTool,
		currentAlgo,
		visualizationRunning,
		finishNodeSearchRunning,
		pathConnectionRunning,
		wasPathFound,
		totalCells,
		mazeRows,
		mazeCols,
	} = useAppStore();

	const [visualizationStatus, setVisualizationStatus] = useState("");

	useEffect(() => {
    // debugger;
		if (visualizationRunning) {
			if (pathConnectionRunning) {
				setVisualizationStatus("Routing");
			} else if (finishNodeSearchRunning) {
				setVisualizationStatus("Searching");
			}
		} else {
			if (wasPathFound !== null) {
				if (wasPathFound) {
					setVisualizationStatus("Path found");
				} else {
					setVisualizationStatus("No path found");
				}
			}
		}
	}, [
		visualizationRunning,
		finishNodeSearchRunning,
		pathConnectionRunning,
		wasPathFound,
	]);

	return (
		<div className="flex flex-row gap-6">
			<div className="flex flex-row gap-1">
				{visualizationRunning && (
					<span className="loading loading-spinner loading-xs text-primary"></span>
				)}
				<span>{visualizationStatus}</span>
			</div>
			{currentTool && <div>{currentTool} Tool</div>}
			<div>{currentAlgo.sName}</div>
			<div>{totalCells > 0 && `${totalCells} cells`}</div>
			<div>{mazeRows > 0 && mazeCols > 0 && `${mazeCols}x${mazeRows} maze`}</div>
		</div>
	);
}
