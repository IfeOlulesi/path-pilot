export default function MazeLights() {
	return (
		<>
			<ambientLight intensity={0.6} />
			<directionalLight
				position={[10, 20, 10]}
				intensity={0.6}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
		</>
	);
}
