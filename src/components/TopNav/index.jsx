import PathPilotLogo from "@/assets/PathPilotLogo";
import { useAppStore } from "@/store";

export default function TopNav() {
	const { findShortestPath, startPos, endPos } = useAppStore();

	function handleVisualize() {
		// INFO: Gaurd clause to check if start and end pos are valid

		if (startPos === null && endPos === null) {
			alert("Choose starting and ending point");
		} else if (startPos === null) {
			alert("Choose starting point");
		} else if (endPos === null) {
			alert("Choose ending point");
		} else {
			console.log("Visualizing...");
			findShortestPath();
		}
	}

	return (
		<div className="flex flex-row bg-white border-b-2 p-3 border-b-[#E4E7EC] justify-between">
			<div className="flex place-content-center">
				<PathPilotLogo color="#101928" />
			</div>
			<div className="text-sm flex 	flex-wrap content-center">
				Pick, select then visualize
			</div>
			<div
				onClick={handleVisualize}
				className="bg-[#1976D2] py-2 px-4 rounded-md text-white text-sm cursor-pointer"
			>
				Visualize
			</div>
		</div>
	);
}
