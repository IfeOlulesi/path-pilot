import PropTypes from "prop-types";

export default function MyFAB({
	icon,
	bgColor,
	border = false,
	borderColor = "",
	onClick,
	size = "sm",
}: MyFABProps) {

	const sizes = {
		sm: "p-3",
		md: "p-4",
	};
	return (
		<div
			className={`${
				sizes[size]
			} rounded-full inline-flex w-fit place-content-center shadow-md cursor-pointer ${
				border && `border-[${borderColor}]`
			}`}
			onClick={onClick}
			style={{
				backgroundColor: bgColor,
				borderWidth: "1.35px",
				border: border ? borderColor : "",
			}}
		>
			{icon}
		</div>
	);
}

interface MyFABProps {
	icon: React.ReactNode;
	bgColor: string;
	border: boolean;
	borderColor?: string;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	size?: "sm" | "md";
	className?: string;
}
