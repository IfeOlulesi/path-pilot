// import { DrawerNav } from '@/components/DrawerNav'
import TopNav from '@/components/TopNav'
import Maze from '@/components/Maze'
import ActionsLayer from '@/components/ActionsLayer'

function App() {
	return (
		<div className="flex h-screen">
			{/* <DrawerNav /> */}

			<div className="w-full flex flex-col" >
				<TopNav />
				<Maze />
				<ActionsLayer />
			</div>
		</div>
	);
}

export default App;
