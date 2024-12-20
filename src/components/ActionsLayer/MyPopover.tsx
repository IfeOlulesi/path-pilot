import { useAppStore } from "@/store";
import { algorithms } from "@/utils/constants";
import theme from "@/utils/theme";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import PropTypes from "prop-types";

function MyPopover({ triggerButton, menu, handleMenuClick }) {
	const primTheme = theme.lightMode.primary;
	const hoverTheme = theme.lightMode.secondary;
	const { currentAlgo } = useAppStore();
	return (
		<Popover>
			<PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-black">
				{triggerButton}
			</PopoverButton>
			<PopoverPanel
				transition
				anchor="left end"
				className={`divide-y divide-black/5 rounded-xl bg-[${primTheme}] text-sm transition duration-200 ease-in-out [--anchor-gap:8px] data-[closed]:-translate-y-1 data-[closed]:opacity-0`}
			>
				<div className="p-3">
					{menu.map((menuItem, index) => {
						const menuBg =
							currentAlgo.key === menuItem
								? theme.lightMode.secondary
								: theme.lightMode.primary;
						return (
							<a
								className={`block bg-[${menuBg}] rounded-lg py-2 px-2 transition hover:bg-[${hoverTheme}] `}
								href="#"
								key={index}
								onClick={() => handleMenuClick(algorithms[menuItem])}
							>
								<p className="text-white">{algorithms[menuItem].lName}</p>
							</a>
						);
					})}
				</div>
			</PopoverPanel>
		</Popover>
	);
}

export default MyPopover;

MyPopover.propTypes = {
	triggerButton: PropTypes.element,
	menu: PropTypes.array,
	handleMenuClick: PropTypes.func,
};
