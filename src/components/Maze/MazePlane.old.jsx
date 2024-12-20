/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useAppStore } from "../../store";

const MazePlane = () => {
	const { camera, raycaster, pointer, scene } = useThree();
	const isPointerDown = useRef(false);
	const { currentTool, updateCell, mazeRows, mazeCols } = useAppStore();

	useFrame(() => {
		if (!isPointerDown.current) return;

		raycaster.setFromCamera(pointer, camera);
		const intersects = raycaster.intersectObjects(scene.children, true);

		// console.log(pointer, camera);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			const position = intersect.point;
			console.log(intersect);
			const col = Math.floor(position.x + mazeCols / 2);
			const row = Math.floor(position.z + mazeRows / 2);

			if (row >= 0 && row < mazeRows && col >= 0 && col < mazeCols) {
				switch (currentTool) {
					case "wall":
						updateCell(row, col, { type: "wall" });
						break;
					case "eraser":
						updateCell(row, col, { type: "empty" });
						break;
				}
			}
		}
	});

	return (
		<mesh
			position={[0, -0.1, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
			onPointerDown={() => (isPointerDown.current = true)}
			onPointerUp={() => (isPointerDown.current = false)}
			onPointerLeave={() => (isPointerDown.current = false)}
		>
			<planeGeometry args={[mazeCols, mazeRows]} />
			<meshBasicMaterial color="#e5e7eb" />
		</mesh>
	);
};

export default MazePlane;
