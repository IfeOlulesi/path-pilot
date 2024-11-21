/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";

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
		<mesh position={position}>
			<boxGeometry args={[1, 0.1, 1]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
}
