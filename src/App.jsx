import DrawerNav from "./components/DrawerNav";
import Maze from "./components/Maze";
import TopNav from "./components/TopNav";

function App() {
	return (
		<div className="flex h-screen">
			<DrawerNav />

			<div className="w-full flex flex-col" >
				<TopNav />
				<Maze />
			</div>
		</div>
	);
}

export default App;
