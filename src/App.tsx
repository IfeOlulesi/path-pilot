// import { DrawerNav } from '@/components/DrawerNav'
import TopNav from "@/components/TopNav";
import Maze from "@/components/Maze";
import ActionsLayer from "@/components/ActionsLayer";
import StatusBar from "./components/StatusBar";
import theme from "./utils/theme";

function App() {
	return (
		<div className="flex h-dvh">
			{/* <DrawerNav /> */}

			<div className="w-full h-full flex flex-col justify-between" style={{ backgroundColor: theme.lightMode.background }}>
				<TopNav />
				<Maze />
				<StatusBar />
				<ActionsLayer />
			</div>
		</div>
	);
}

export default App;
