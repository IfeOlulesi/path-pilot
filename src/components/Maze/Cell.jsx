/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { BoxGeometry } from "three";

export default function Cell({ position, type, onClick }) {
	const color = useMemo(() => {
		switch (type) {
			case "wall":
				return "#1f2937";
			case "start":
				return "#22c55e";
			case "end":
				return "#ef4444";
			case "path":
				return "#3b82f6";
			case "visited":
				return "#93c5fd";
			default:
				return "#ffffff";
		}
	}, [type]);

	return (
		<group position={position}>
			{/* Main cell mesh */}
			<mesh>
				<boxGeometry args={[1, 0.1, 1]} />
				<meshStandardMaterial color={color} />
			</mesh>

			{/* Border mesh */}
			<lineSegments>
				<edgesGeometry args={[new BoxGeometry(1, 0.1, 1)]} />
				<lineBasicMaterial color="black" />
			</lineSegments>
		</group>
	);
}
