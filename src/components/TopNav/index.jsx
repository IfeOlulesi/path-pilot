import PathPilotLogo from "@/assets/PathPilotLogo";
import { useAppStore } from "@/store";
import theme from "@/utils/theme";

export default function TopNav() {
	const { initializeMaze, findShortestPath, startPos, endPos } = useAppStore();

	function handleVisualize() {
		// TODO: Add check for if visualization is currently running
		// INFO: Gaurd clause to check if start and end pos are valid
		if (startPos === null && endPos === null) {
			alert("Choose starting and ending point");
		} else if (startPos === null) {
			alert("Choose starting point");
		} else if (endPos === null) {
			alert("Choose ending point");
		} else {
			findShortestPath();
		}
	}

	function handleClear() {
		// TODO: Add check for if visualization is currently running
		initializeMaze();
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
				<div
					onClick={handleClear}
					className="content-center px-4 rounded-md text-sm cursor-pointer"
          style={{
            borderColor: theme.lightMode.primary,
            color: theme.lightMode.primary,
            borderWidth: '1px'
          }}
				>
					Clear Maze
				</div>
				<div
					onClick={handleVisualize}
					className="bg-[#1976D2] py-2 px-4 rounded-md text-white text-sm cursor-pointer flex place-content-center"
				>
					Visualize
				</div>
			</div>
		</div>
	);
}
