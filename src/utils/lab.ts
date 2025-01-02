// import { CellCoordinatesArr, CellCoordinatesObj } from "./types";

type CellCoordinatesArr = [number, number];

// INFO: interfaces
interface CellCoordinatesObj {
	row: number;
	col: number;
	type: string;
}

interface ReconstructPathParams {
	predecessors: Map<string, string>;
	start: CellCoordinatesArr;
	end: CellCoordinatesArr;
}

function createGraph(rows: number, cols: number) {
	return Array.from({ length: rows }, (_, elRow) =>
		Array.from({ length: cols }, (_, elCol) => ({
			row: elRow,
			col: elCol,
			type: "none",
		}))
	);
}

const twoDGraph = createGraph(28, 14); // Create a n x m graph dynamically

function bfs(start: CellCoordinatesArr, end: CellCoordinatesArr) {
	var queue: CellCoordinatesArr[] = [start];
	var visitedCells = new Set();
	var predecessors = new Map();
	var counter = 0;

	while (queue.length > 0) {
		let current = queue.shift();

		if (!current) {
			throw new Error("Current cell is undefined");
		}

		// INFO: Destination node found
		if (JSON.stringify(current) === JSON.stringify(end)) {
			console.log("counter", counter);
			return reconstructPath(predecessors, start, end);
		}

		visitedCells.add(JSON.stringify(current));
		const neighboursArr = getNeighbours(current);

		// INFO: Explore the neighbors of current node
		for (let neighbour of neighboursArr) {
			const hasCellBeenVisited = visitedCells.has(JSON.stringify(neighbour));

			if (!hasCellBeenVisited) {
				queue.push(neighbour);
				visitedCells.add(JSON.stringify(neighbour)); // wondering why this line tho
				predecessors.set(JSON.stringify(neighbour), JSON.stringify(current)); // document the route to this node/cell
			}
		}

		counter++;
	}

	// no path found
	console.log("counter", counter);
	return false;
}

function getNeighbours(
	cell: CellCoordinatesArr,
	graph: CellCoordinatesObj[][] = twoDGraph
) {
	const [row, col] = cell;
	const neighbours: CellCoordinatesArr[] = [];

	// find dimension of graph - max x, max y
	// assuming all rows are equal in dim
	const rowMax = graph.length;
	const colMax = graph[0].length;

	const NC: CellCoordinatesArr = [row - 1, col];
	const SC: CellCoordinatesArr = [row + 1, col];
	const WC: CellCoordinatesArr = [row, col - 1];
	const EC: CellCoordinatesArr = [row, col + 1];

	const allNeighbours: CellCoordinatesArr[] = [NC, WC, EC, SC];

	for (const neighbour in allNeighbours) {
		const targetNeighbour = allNeighbours[neighbour];

		// INFO: Gaurd against invalid indexes, ensure all indexes >= 0
		if (targetNeighbour[0] >= 0 && targetNeighbour[1] >= 0) {
			// INFO: Gaurd against out-of-range indexes i.e. index < elements in array
			if (targetNeighbour[0] < rowMax && targetNeighbour[1] < colMax) {
				neighbours.push(targetNeighbour);
			}
		}
	}

	return neighbours;
}

function reconstructPath(
	predecessors: Map<string, string>,
	start: CellCoordinatesArr,
	end: CellCoordinatesArr
) {
	let path: CellCoordinatesArr[] = [end];
	let current: string | undefined = JSON.stringify(end);

	while (current !== JSON.stringify(start)) {
		current = predecessors.get(current);
		if (!current) {
			throw new Error("Current cell is undefined");
		}
		path.unshift(JSON.parse(current));
	}

	// at this point, path should contain the shortest path
	return path;
}

const startingPos: CellCoordinatesArr = [2, 2];
const endingPos: CellCoordinatesArr = [10, 14];

const shortestPath = bfs(startingPos, endingPos);

if (Array.isArray(shortestPath)) {
	for (const node in shortestPath) {
		const cords = shortestPath[node];
		twoDGraph[cords[0]][cords[1]] = {
			row: cords[0],
			col: cords[1],
			type: "path",
		};
	}
}

for (let row = 0; row < twoDGraph.length; row++) {
	let rowString = '';
	for (let col = 0; col < twoDGraph[row].length; col++) {
		rowString += twoDGraph[row][col].type === 'path' ? '🟩' : '⬛';
	}
	console.log(rowString);
}

// console.log(twoDGraph);
