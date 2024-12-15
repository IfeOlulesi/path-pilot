import theme from "@/utils/theme";
import PathPilotLogoMini from "@/assets/PathPilotLogoMini";
import MyFAB from "@/components/ActionsLayer/MyFAB";
import { useState } from "react";
import { BrickWall, Eraser, Flag, MapPin, X } from "lucide-react";

export default function ActionsLayer() {
	const [showButtons, setShowButtons] = useState(false);

	const handleShowButtons = () => {
		console.log("showButtons: ", showButtons);
		setShowButtons(!showButtons);
	};

	const secActions = [
		{
			icon: <BrickWall color={theme.lightMode.primary} size={20} />,
			color: theme.lightMode.white,
			border: true,
			borderColor: theme.lightMode.primary,
		},
		{
			icon: <Eraser color={theme.lightMode.primary} size={20} />,
			color: theme.lightMode.white,
			border: true,
			borderColor: theme.lightMode.primary,
		},
		{
			icon: <MapPin color={theme.lightMode.primary} size={20} />,
			color: theme.lightMode.white,
			border: true,
			borderColor: theme.lightMode.primary,
		},
		{
			icon: <Flag color={theme.lightMode.primary} size={20} />,
			color: theme.lightMode.white,
			border: true,
			borderColor: theme.lightMode.primary,
		},
	];

	return (
		<div className="absolute bottom-0 right-0 bg-red-500/0">
			<div className="absolute bottom-0 right-0 p-4">
				<div className="flex flex-col gap-2 pb-4">
					{showButtons &&
						secActions.map((action, index) => (
							<MyFAB
								icon={action.icon}
								color={action.color}
								className="absolute bottom-0 right-0"
								border={action.border}
								borderColor={action.borderColor}
								// onClick={handleShowButtons}
								key={index}
							/>
						))}
				</div>
				<MyFAB
					icon={
						showButtons ? (
							<X color={theme.lightMode.white} size={20} />
						) : (
							<PathPilotLogoMini color={theme.lightMode.white} scale={0.8} />
						)
					}
					color={theme.lightMode.primary}
					className="absolute bottom-0 right-0"
					onClick={handleShowButtons}
				/>
			</div>
		</div>
	);
}
