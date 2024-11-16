import pathPilotLogo from "../../assets/path-pilot.svg";
import {
	Cpu,
	ChevronDown,
	MapPinned,
	Bomb,
	Undo2,
	ScanSearch,
	MapPin,
	Flag,
	Settings,
	UsersRound,
} from "lucide-react";

export default function DrawerNav() {
	const ICON_SIZE = 20;
	const ICON_COLOR = "#98A2B3";

	const topNavActions = [
		{
			expand: true,
			title: "Pick Algorithm",
			icon: <Cpu color={ICON_COLOR} size={ICON_SIZE} />,
			chiildren: [
				{
					title: "Breadth First Search",
				},
				{
					title: "Depth First Search",
				},
				{
					title: "Dijkstra",
				},
				{
					title: "A* search",
				},
			],
		},
		{
			expand: true,
			title: "Select Maze Pattern",
			icon: <MapPinned color={ICON_COLOR} size={ICON_SIZE} />,
			children: [
				{
					title: "Recursive Division",
				},
				{
					title: "Vertical Division",
				},
				{
					title: "Horizontal Division",
				},
				{
					title: "Basic Random Maze",
				},
				{
					title: "Simple Stair Pattern",
				},
			],
		},
		{
			expand: false,
			title: "Add Bomb",
			icon: <Bomb color={ICON_COLOR} size={ICON_SIZE} />,
		},
		{
			expand: true,
			title: "Reset Maze",
			icon: <Undo2 color={ICON_COLOR} size={ICON_SIZE} />,
		},
		{
			expand: false,
			title: "Legends",
			icon: <ScanSearch color={ICON_COLOR} size={ICON_SIZE} />,
			children: [
				{
					title: "Start point",
					icon: <MapPin />,
				},
				{
					title: "Finish point",
					icon: <Flag />,
				},
				{
					title: "Unvisited Nodes",
					icon: <Flag />,
				},
				{
					title: "Visited Nodes",
					icon: <Flag />,
				},
				{
					title: "Shortest path",
					icon: <Flag />,
				},
				{
					title: "Wallss",
					icon: <Flag />,
				},
			],
		},
	];

	const bottomNavActions = [
		{
			title: "Settings",
			icon: <Settings color={ICON_COLOR} size={ICON_SIZE} />,
		},
		{
			title: "Credits",
			icon: <UsersRound color={ICON_COLOR} size={ICON_SIZE} />,
		},
	];

	return (
		<div className="w-58 bg-[#101928] p-8 pr-4 pl-4">
			<div className="flex place-content-center">
				<img src={pathPilotLogo} alt="Path Pilot Logo" style={{ width: 160 }} />
			</div>

			<div className="pt-24 pb-4 h-full flex flex-col justify-between">
				<div>
					{topNavActions.map((action) => {
						return <DrawerListAction actionMeta={action} />;
					})}
				</div>

				<div>
					{bottomNavActions.map((action) => {
						return <DrawerListAction actionMeta={action} />;
					})}
        </div>
			</div>
		</div>
	);
}

function DrawerListAction({ actionMeta }) {
	const ICON_SIZE = 20;
	const ICON_COLOR = "#98A2B3";

	return (
		<div className="p-2 pb-4 flex ">
			<div>{actionMeta.icon}</div>
			<div className="flex flex-1 justify-between">
				<p className="text-sm pl-4 text-[#98A2B3]">{actionMeta.title}</p>
				{actionMeta.expand && (
					<div className="ml-4 content-end">
						<ChevronDown color={ICON_COLOR} size={ICON_SIZE} />
					</div>
				)}
			</div>
		</div>
	);
}
