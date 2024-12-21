import { useAppStore } from "@/store";
import { algorithms } from "@/utils/constants";
import theme from "@/utils/theme";

function MyPopover({ triggerButton, menu, handleMenuClick }: MyPopoverProps) {
	const { currentAlgo } = useAppStore();
	return (
		<div className="dropdown dropdown-left dropdown-end">
			<div tabIndex={0} role="button">
				{triggerButton}
			</div>

			<ul
				tabIndex={0}
				className="dropdown-content menu bg-accent rounded-box z-[1] w-60 shadow mr-2"
			>
				{menu.map((menuItem, index) => {
					const menuBg =
						currentAlgo.key === menuItem
							? theme.lightMode.secondary
							: theme.lightMode.primary;
					return (
						<li
							className={`block rounded-lg p-1 transition text-white`}
							style={{
								backgroundColor: menuBg
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = theme.lightMode.lightPrimary;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = menuBg;
							}}
							key={index}
							onClick={() => handleMenuClick(algorithms[menuItem as keyof typeof algorithms])}
						>
							<a>{algorithms[menuItem as keyof typeof algorithms].lName}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MyPopover;

interface MyPopoverProps {
	triggerButton: React.ReactElement;
	menu: string[];
	handleMenuClick: (algo: any) => void;
}
