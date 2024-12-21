import { useState } from "react";
import { BrickWall, Cpu, Eraser, Flag, MapPin, X } from "lucide-react";
import PropTypes from "prop-types";

import theme from "@/utils/theme";
import { useAppStore } from "@/store";
import MyFAB from "@/components/ActionsLayer/MyFAB";
import { algorithms, tools } from "@/utils/constants";
import PathPilotLogoMini from "@/assets/PathPilotLogoMini";
import MyPopover from "@/components/ActionsLayer/MyPopover";

export default function ActionsLayer() {
	const [showButtons, setShowButtons] = useState(false);
	const [menuContent, setMenuContent] = useState<string[] | null>(null);
	const { setCurrentTool } = useAppStore();

	const primFabIcon = showButtons ? (
		<X color={theme.lightMode.white} size={30} />
	) : (
		<PathPilotLogoMini color={theme.lightMode.white} scale={1} />
	);

	const handleShowButtons = () => {
		setShowButtons(!showButtons);
	};

	const handleClickAction = ({
		tool,
		type,
		menu = [],
	}: {
		tool: string;
		type: string;
		menu: string[];
	}) => {
		if (type === "tool") {
			setCurrentTool(tool);
		} else if (type === "menu") {
			if (menuContent === null) {
				setMenuContent(menu);
			} else {
				setMenuContent(null);
			}
		}
	};

	return (
		<div className="absolute bottom-0 right-0 bg-red-500/0">
			<div className="absolute bottom-0 right-0 px-4 py-10">
				<div className="flex flex-col gap-2 pb-4 items-center">
					<ShowSecondaryFABs
						showButtons={showButtons}
						handleClickAction={handleClickAction}
					/>
				</div>
				<>
					<MyFAB
						inactiveIcon={primFabIcon}
						onClick={handleShowButtons}
						size="lg"
					/>
				</>
			</div>
		</div>
	);
}

function ShowSecondaryFABs({
	showButtons,
	handleClickAction,
}: {
	showButtons: boolean;
	handleClickAction: (action: any) => void;
}) {
	const { setCurrentAlgo, currentTool, visualizationRunning } = useAppStore();

	const modelSecToolFab = {
		color: theme.lightMode.white,
		border: true,
		borderColor: theme.lightMode.white,
		type: "tool",
    isActive: !visualizationRunning,
	};

	const secActions = [
		{
			...modelSecToolFab,
			activeIcon: <BrickWall color={theme.lightMode.primary} size={20} />,
			inactiveIcon: <BrickWall color={theme.lightMode.white} size={20} />,
			tool: tools.wall,
			tooltipText: "Wall tool",
      isSelected: currentTool === tools.wall,
		},
		{
			...modelSecToolFab,
			activeIcon: <Eraser color={theme.lightMode.primary} size={20} />,
			inactiveIcon: <Eraser color={theme.lightMode.white} size={20} />,
			tool: tools.eraser,
			tooltipText: "Eraser tool",
      isSelected: currentTool === tools.eraser,
		},
		{
			...modelSecToolFab,
			activeIcon: <MapPin color={theme.lightMode.primary} size={20} />,
			inactiveIcon: <MapPin color={theme.lightMode.white} size={20} />,
			tool: tools.begin,
			tooltipText: "Begin tool",
      isSelected: currentTool === tools.begin,
		},
		{
			...modelSecToolFab,
			activeIcon: <Flag color={theme.lightMode.primary} size={20} />,
			inactiveIcon: <Flag color={theme.lightMode.white} size={20} />,
			tool: tools.finish,
			tooltipText: "Finish tool",
      isSelected: currentTool === tools.finish,
		},
		{
			...modelSecToolFab,
			activeIcon: <Cpu color={theme.lightMode.primary} size={20} />,
			inactiveIcon: <Cpu color={theme.lightMode.white} size={20} />,
			type: "menu",
			fn: "set-algo",
			menu: Object.keys(algorithms),
			tooltipText: "Select Algorithm",
      isSelected: false
		},
	];

	return (
		<>
			{showButtons &&
				secActions.map((action, index) => {
					if (action.type === "menu") {
						return (
							<MyPopover
								triggerButton={
									<MyFAB
										activeIcon={action.activeIcon}
										inactiveIcon={action.inactiveIcon}
										isSelected={action.isSelected} 
										onClick={() => handleClickAction(action)}
										key={index}
										tooltipText={action.tooltipText}
                    isActive={action.isActive}
									/>
								}
								menu={"menu" in action ? action.menu : undefined}
								handleMenuClick={setCurrentAlgo}
								key={index}
							/>
						);
					} else {
						return (
							<MyFAB
								activeIcon={action.activeIcon}
								inactiveIcon={action.inactiveIcon}
								isSelected={action.isSelected} 
								onClick={() => handleClickAction(action)}
								key={index}
								tooltipText={action.tooltipText}
                isActive={action.isActive}
							/>
						);
					}
				})}
		</>
	);
}

ShowSecondaryFABs.propTypes = {
	showButtons: PropTypes.bool,
	handleClickAction: PropTypes.func,
};
