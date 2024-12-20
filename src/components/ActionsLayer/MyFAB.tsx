import PropTypes from "prop-types";

export default function MyFAB({
	icon,
	bgColor, 
	onClick,
	size = "md",
	tooltipText = null,
}: MyFABProps) {

	return (
    <div className={`${tooltipText ? "tooltip tooltip-left tooltip-secondary" : ""} `} data-tip={tooltipText}>
      <button
        className={`btn btn-primary btn-circle btn-${size}`}
        onClick={onClick}
        style={{
          borderWidth: "1.35px",
        }}
      >
        {icon}
      </button>

    </div>
	);
}

interface MyFABProps {
	icon: React.ReactNode;
	bgColor: string; 
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	size?: "sm" | "md" | "lg"; 
	tooltipText?: string | null;
}
