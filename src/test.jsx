import { useEffect, useState } from "react";

export default function Test(props) {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		console.log("Hello");
		setCounter(1);
    
	}, [props.visible]);
	return (
		<>
			<>You are my hiding place</>
			<div>{counter}</div>
		</>
	);
}
