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
	ChevronUp,
} from "lucide-react";
import { useAppStore } from "../../store";

export default function DrawerNav() {
	return (
		<div className="w-50 bg-[#101928] p-8 pr-4 pl-4 pb-0 overflow-y-auto flex flex-col">
			<div className="flex place-content-center">
				<img src={pathPilotLogo} alt="Path Pilot Logo" style={{ width: 160 }} />
			</div>

			<div className="pt-24 pb-4 flex flex-col justify-between h-full">
				<div>
					{TOP_NAV_ACTIONS.map((action) => {
						return <DrawerListAction key={action.id} actionMeta={action} />;
					})}
				</div>

				<div>
					{BOTTOM_NAV_ACTIONS.map((action) => {
						return <DrawerListAction key={action.title} actionMeta={action} />;
					})}
				</div>
			</div>
		</div>
	);
}

function DrawerListAction({ actionMeta }) {
	const ICON_SIZE = 16;
	const ICON_COLOR = "#98A2B3";

	const { expandedDrawerNav, expandDrawerNav } = useAppStore();

	function handleDrawerClick() {
		if (actionMeta.expand) {
			expandDrawerNav(actionMeta.id);
		}
	}

	return (
		<div
			onClick={handleDrawerClick}
			className="p-2 pb-4 flex flex-col cursor-pointer"
		>
			<div className="flex flex-row">
				<div>{actionMeta.icon}</div>
				<div className="flex flex-1 justify-between">
					<p className="text-xs pl-4 text-[#98A2B3]">{actionMeta.title}</p>
					{actionMeta.expand && (
						<div className="ml-4 content-end">
							{expandedDrawerNav !== actionMeta.id ? (
								<ChevronDown color={ICON_COLOR} size={ICON_SIZE} />
							) : (
								<ChevronUp color={ICON_COLOR} size={ICON_SIZE} />
							)}
						</div>
					)}
				</div>
			</div>
			<div>
				{/* Actions Children */}
				{expandedDrawerNav === actionMeta.id && (
					<DrawerListActionChildren listOfChildren={actionMeta.children} />
				)}
			</div>
		</div>
	);
}

function DrawerListActionChildren({ listOfChildren }) {
	return (
		<div className="mt-4 bg-[#1D2739] rounded-sm">
			{listOfChildren.map((child) => (
				<p key={child.title} className="text-xs text-[#98A2B3] pl-8 p-2">
					{child.title}
				</p>
			))}
		</div>
	);
}

const ICON_SIZE = 16;
const ICON_COLOR = "#98A2B3";

const TOP_NAV_ACTIONS = [
	{
		id: 1,
		expand: true,
		title: "Pick Algorithm",
		icon: <Cpu color={ICON_COLOR} size={ICON_SIZE} />,
		children: [
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
		id: 2,
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
		id: 3,
		expand: false,
		title: "Add Bomb",
		icon: <Bomb color={ICON_COLOR} size={ICON_SIZE} />,
	},
	{
		id: 4,
		expand: false,
		title: "Reset Maze",
		icon: <Undo2 color={ICON_COLOR} size={ICON_SIZE} />,
	},
	{
		id: 5,
		expand: true,
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
				title: "Walls",
				icon: <Flag />,
			},
		],
	},
];

const BOTTOM_NAV_ACTIONS = [
	{
		title: "Settings",
		icon: <Settings color={ICON_COLOR} size={ICON_SIZE} />,
	},
	{
		title: "Credits",
		icon: <UsersRound color={ICON_COLOR} size={ICON_SIZE} />,
	},
];
