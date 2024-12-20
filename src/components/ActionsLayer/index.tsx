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
		<X color={theme.lightMode.white} size={20} />
	) : (
		<PathPilotLogoMini color={theme.lightMode.white} scale={0.8} />
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
						icon={primFabIcon}
						bgColor={theme.lightMode.primary}
						className="absolute bottom-0 right-0"
						border={false}
						onClick={handleShowButtons}
						size="md"
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
	const { setCurrentAlgo } = useAppStore();

	const modelSecToolFab = {
		color: theme.lightMode.white,
		border: true,
		borderColor: theme.lightMode.primary,
		type: "tool",
	};

	const secActions = [
		{
			...modelSecToolFab,
			icon: <BrickWall color={theme.lightMode.primary} size={20} />,
			tool: tools.wall,
		},
		{
			...modelSecToolFab,
			icon: <Eraser color={theme.lightMode.primary} size={20} />,
			tool: tools.eraser,
		},
		{
			...modelSecToolFab,
			icon: <MapPin color={theme.lightMode.primary} size={20} />,
			tool: tools.begin,
		},
		{
			...modelSecToolFab,
			icon: <Flag color={theme.lightMode.primary} size={20} />,
			tool: tools.finish,
		},
		{
			...modelSecToolFab,
			icon: <Cpu color={theme.lightMode.primary} size={20} />,
			type: "menu",
			fn: "set-algo",
			menu: Object.keys(algorithms),
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
										icon={action.icon}
										bgColor={action.color}
										className="absolute bottom-0 right-0"
										border={action.border}
										borderColor={action.borderColor}
										onClick={() => handleClickAction(action)}
										key={index}
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
								icon={action.icon}
								bgColor={action.color}
								className="absolute bottom-0 right-0"
								border={action.border}
								borderColor={action.borderColor}
								onClick={() => handleClickAction(action)}
								key={index}
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
