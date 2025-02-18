import { cells } from "./constants";
import {
	CellCoordinatesArr,
	CellCoordinatesObj,
	ReconstructPathParams,
} from "./types";

async function algoFS(
	start: CellCoordinatesArr,
	end: CellCoordinatesArr,
	maze: CellCoordinatesObj[][],
	algo: "bfs" | "dfs",
	onVisit: (cell: CellCoordinatesArr) => Promise<void>,
	onPathFound: (path: CellCoordinatesArr[]) => Promise<void>,
	onPathNotFound: () => void
) {
	let iterationCount = 0;
	var queue = [start];
	var visitedCells = new Set<string>();
	var predecessors = new Map<string, string>();

	while (queue.length > 0) {
		iterationCount++;
		let current = algo === "dfs" ? queue.pop() : queue.shift();
		if (current === undefined) {
			throw new Error("Current cell is undefined");
		}

		// Measure string conversion
		const isEnd = JSON.stringify(current) === JSON.stringify(end);

		if (isEnd) {
			const path = reconstructPath({ predecessors, start, end });
			await onPathFound(path);
			console.log(iterationCount);
			return true;
		}

		const currentStr = JSON.stringify(current);
		visitedCells.add(currentStr);
		const neighboursArr = getNeighbours(current, maze);
		await onVisit(current);

		// INFO: Explore the neighbors of current node
		for (let neighbour of neighboursArr) {
			const neighbourStr = JSON.stringify(neighbour);
			const hasCellBeenVisited = visitedCells.has(neighbourStr);
			if (!hasCellBeenVisited) {
				queue.push(neighbour);
				predecessors.set(neighbourStr, currentStr);
				if (algo === "dfs") {
					break;
				}
			}
		}
	}

	onPathNotFound();
	return false;
}

function getNeighbours(cell: [number, number], maze: CellCoordinatesObj[][]) {
	// should return an iterable: array
	// max of 4 neighbours, min of 3
	const [row, col] = cell;
	const neighbours = [];

	// find dimension of maze - max x, max y
	// assuming all rows are equal in dim
	const rowMax = maze.length;
	const colMax = maze[0].length;

	// INFO: Initially considered adding diagonal nodes as valid neighbors,
	// INFO: Thought otherwise on second thought
	// const NW = [row - 1, col - 1]
	// const NE = [row - 1, col  + 1]
	// const SW = [row + 1, col - 1]
	// const SE = [row + 1, col  + 1]
	// const allNeighbours = [NW, NC, NE, WC, EC, SW, SC, SE]

	const NC = [row - 1, col] as CellCoordinatesArr;
	const SC = [row + 1, col] as CellCoordinatesArr;
	const WC = [row, col - 1] as CellCoordinatesArr;
	const EC = [row, col + 1] as CellCoordinatesArr;

	const allNeighbours = [NC, EC, SC, WC];

	for (const neighbour of allNeighbours) {
		// INFO: Gaurd against invalid indexes, ensure all indexes >= 0
		if (neighbour[0] >= 0 && neighbour[1] >= 0) {
			// INFO: Gaurd against out-of-range indexes i.e. index < elements in array
			if (neighbour[0] < rowMax && neighbour[1] < colMax) {
				const targetRow = neighbour[0];
				const targetCol = neighbour[1];

				if (maze[targetRow][targetCol].type !== cells.wall.name) {
					// INFO: Gaurd against wall cells
					neighbours.push(neighbour);
				}
			}
		}
	}

	return neighbours;
}

function reconstructPath({
	predecessors,
	start,
	end,
}: ReconstructPathParams): CellCoordinatesArr[] {
	let path = [end];
	let current = JSON.stringify(end);

	while (current !== JSON.stringify(start)) {
		const next = predecessors.get(current);
		if (!next) {
			throw new Error("Path not found - predecessor missing");
		}
		current = next;
		path.unshift(JSON.parse(current));
	}

	// at this point, path should contain the shortest path
	return path;
}

export { algoFS };
