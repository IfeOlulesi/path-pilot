/* eslint-disable react/no-unknown-property */
import { useAppStore } from "../../store";

export default function MazePlane() {
  const { mazeRows, mazeCols } = useAppStore()
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
			<planeGeometry args={[mazeCols, mazeRows]} />
			<meshStandardMaterial color="#e5e7eb" />
			{/* <gridHelper
						args={[
							Math.max(20, 20),
							Math.max(20, 20),
							"#a1a1aa",
							"#a1a1aa",
						]}
					/> */}
		</mesh>
	);
}
