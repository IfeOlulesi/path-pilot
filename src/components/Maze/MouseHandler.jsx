// INFO: Obsolete

/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useAppStore } from "../../store";

const MouseHandler = () => {
	const { camera, raycaster, pointer, scene } = useThree();
	const isPointerDown = useRef(false);
	const {
		currentTool,
		setCellType,
		// setStartPos,
		// setEndPos,
		mazeRows,
		mazeCols,
	} = useAppStore();

	useFrame(() => {
		if (!isPointerDown.current) return;

		raycaster.setFromCamera(pointer, camera);
		const intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length > 0) {
			const intersect = intersects[0];
			const position = intersect.object.position;
			const col = Math.floor(position.x + mazeCols / 2);
			const row = Math.floor(position.z + mazeRows / 2);

			if (row >= 0 && row < mazeRows && col >= 0 && col < mazeCols) {
				switch (currentTool) {
					case "wall":
						setCellType(row, col, "wall");
						break;
					case "eraser":
						setCellType(row, col, "empty");
						break;
				}
			}
		}
	});

	const handlePointerDown = () => {
		isPointerDown.current = true;
	};

	const handlePointerUp = () => {
		isPointerDown.current = false;
	};

	return (
		<mesh
			// visible={false}
			position={[0, -0.1, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
			onPointerLeave={handlePointerUp}
		>
			<planeGeometry args={[mazeCols, mazeRows]} />
			<meshBasicMaterial color="#e5e7eb" />
		</mesh>
	);
};

export default MouseHandler;
