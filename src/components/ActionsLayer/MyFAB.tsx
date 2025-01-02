import theme from "@/utils/theme";


export default function MyFAB({
	activeIcon,
	inactiveIcon,
	isSelected, 
	onClick,
	size = "md",
	tooltipText = null,
  isActive = true,
}: MyFABProps) {

	return (
    <div className={`${tooltipText ? "tooltip tooltip-left tooltip-secondary" : ""} `} data-tip={tooltipText}>
      <button
        className={`btn btn-circle btn-${size} ${isSelected ? "btn-outline" : "btn-primary"}`}
        onClick={onClick}
        style={{
          borderWidth: "1.35px",
          borderColor: theme.lightMode.primary,
        }}
      >
        {isSelected ? activeIcon : inactiveIcon}
      </button>

    </div>
	);
}

interface MyFABProps {
	activeIcon?: React.ReactNode;
	inactiveIcon?: React.ReactNode;
	isSelected?: boolean; 
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	size?: "sm" | "md" | "lg"; 
	tooltipText?: string | null;
  isActive?: boolean;
}
