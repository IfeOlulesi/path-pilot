import PathPilotLogoMini from "../../assets/PathPilotLogoMini";
import MyFAB from '@/components/ActionsLayer/MyFAB'

export default function ActionsLayer() {

	return (
		<div className="absolute bottom-0 left-0 bg-red-500/25 w-full h-full">
			<MyFAB icon={<PathPilotLogoMini color="#101928" />} />
		</div>
	);
}