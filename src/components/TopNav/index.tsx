import PathPilotLogo from "@/assets/PathPilotLogo";
import { useAppStore } from "@/store";
import theme from "@/utils/theme";
import { RotateCcw, Play } from "lucide-react";

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
			<div className="flex place-content-center items-center sm:hidden">
				<PathPilotLogo scale={0.8} color={theme.lightMode.primary} />
			</div>
			<div className="hidden sm:flex place-content-center items-center">
				<PathPilotLogo scale={1} color={theme.lightMode.primary} />
			</div>
			<div className="hidden sm:flex text-sm flex-wrap content-center">
				Pick, select then visualize
			</div>
			<div className="flex flex-row gap-2">
				<button
					onClick={handleClear}
					className={`btn btn-outline btn-secondary btn-sm sm:btn-md`}
					disabled={visualizationRunning}
				>
					<RotateCcw size={16} className="sm:hidden" />
					<p className="hidden sm:flex">Clear Maze</p>
				</button>

				<PrimCtaSM
					handleVisualize={handleVisualize}
					visualizationRunning={visualizationRunning}
				/>

				<PrimCTA
					handleVisualize={handleVisualize}
					visualizationRunning={visualizationRunning}
				/>
			</div>
		</div>
	);
}

function PrimCtaSM({
	handleVisualize,
	visualizationRunning,
}: VisualizeButtonProps) {
	return (
		<button
			onClick={handleVisualize}
			className="sm:hidden flex btn btn-primary btn-sm"
			disabled={visualizationRunning}
		>
			{visualizationRunning ? (
				<span className="loading loading-md loading-spinner"></span>
			) : (
				<Play size={16} />
			)}
		</button>
	);
}

function PrimCTA({
	handleVisualize,
	visualizationRunning,
}: VisualizeButtonProps) {
	return (
		<button
			onClick={handleVisualize}
			className="hidden sm:flex btn btn-primary"
			disabled={visualizationRunning}
		>
			{visualizationRunning && (
				<span className="loading loading-md loading-spinner"></span>
			)}
			{visualizationRunning ? "Visualizing..." : "Visualize"}
		</button>
	);
}

interface VisualizeButtonProps {
	handleVisualize: () => void;
	visualizationRunning: boolean;
}
