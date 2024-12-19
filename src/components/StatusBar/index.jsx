import { useAppStore } from "@/store";
import { cells } from "@/utils/constants";
import theme from "@/utils/theme";

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
	const cellsArr = Object.keys(cells);
	return (
		<div className="flex flex-row gap-4">
			{cellsArr.map((cell, index) => (
				<div key={index} className="flex items-center gap-2">
					<div
						className={`w-3.5 h-3.5`}
						style={{ backgroundColor: cells[cell] }}
					></div>
					<div>{cell} </div>
				</div>
			))}
		</div>
	);
}

function RightContent() {
	const { currentTool, currentAlgo } = useAppStore();
	return (
		<div className="flex flex-row gap-6">
			{currentTool && <div>{currentTool} Tool</div>}
			<div>{currentAlgo.sName}</div>
		</div>
	);
}
