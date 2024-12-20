import PathPilotLogo from "@/assets/PathPilotLogo";
import { useAppStore } from "@/store";
import theme from "@/utils/theme";

export default function TopNav() {
	const {
		endPos,
		startPos,
		visualizationRunning,
		initializeMaze,
		findShortestPath,
		prepMazeForNewVisualization,
	} = useAppStore();

	function handleVisualize() {
		if (!visualizationRunning) {
			// INFO: Gaurd clause to check if start and end pos are valid
			if (startPos === null && endPos === null) {
				alert("Choose starting and ending point");
			} else if (startPos === null) {
				alert("Choose starting point");
			} else if (endPos === null) {
				alert("Choose ending point");
			} else {
				prepMazeForNewVisualization();
				findShortestPath();
			}
		}
	}

	function handleClear() {
		if (!visualizationRunning) {
			initializeMaze();
		}
	}

	return (
		<div className="flex flex-row bg-white border-b-2 p-3 border-b-[#E4E7EC] justify-between">
			<div className="flex place-content-center">
				<PathPilotLogo color={theme.lightMode.primary} />
			</div>
			<div className="text-sm flex 	flex-wrap content-center">
				Pick, select then visualize
			</div>
			<div className="flex flex-row gap-2">
				<button
					onClick={handleClear}
					className="btn btn-outline btn-secondary"
					disabled={visualizationRunning}
				>
					Clear Maze
				</button>
				<button
					onClick={handleVisualize}
					className="btn btn-primary"
					disabled={visualizationRunning}
				>
					{visualizationRunning && (
						<span className="loading loading-md loading-spinner"></span>
					)}
					{visualizationRunning ? "Visualizing..." : "Visualize"}
				</button>
			</div>
		</div>
	);
}
