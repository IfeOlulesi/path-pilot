import PathPilotLogo from '@/assets/PathPilotLogo'

export default function TopNav() {
	return (
		<div className="flex flex-row bg-white border-b-2 p-3 border-b-[#E4E7EC] justify-between">
			<div className="flex place-content-center">
        <PathPilotLogo color="#101928" />
			</div>
			<div className="text-sm flex 	flex-wrap content-center">Pick, select then visualize</div>
			<div className="bg-[#1976D2] py-2 px-4 rounded-md text-white text-sm cursor-pointer">Visualize</div>
		</div>
	);
}
