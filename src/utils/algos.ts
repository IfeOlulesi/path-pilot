import { cells, tools } from "./constants";
import {
	CellCoordinatesArr,
	CellCoordinatesObj,
	ReconstructPathParams,
} from "./types";

async function bfs(
	start: CellCoordinatesArr,
	end: CellCoordinatesArr,
	maze: CellCoordinatesObj[][],
	onVisit: (cell: CellCoordinatesArr) => Promise<void>,
	onPathFound: (path: CellCoordinatesArr[]) => Promise<void>
) {
	var queue = [start];
	var visitedCells = new Set<string>();
	var predecessors = new Map<string, string>();

	while (queue.length > 0) {
		let current = queue.shift();
		if (current === undefined) {
			throw new Error("Current cell is undefined");
		}

		// INFO: Destination node found
		if (JSON.stringify(current) === JSON.stringify(end)) {
			const path = reconstructPath({ predecessors, start, end });
			await onPathFound(path);
			return true;
		}

		const currentStr = JSON.stringify(current);
		if (!visitedCells.has(currentStr)) {
			visitedCells.add(currentStr);
			await onVisit(current);
		}

		const neighboursArr = getNeighbours(current, maze);

		// INFO: Explore the neighbors of current node
		for (let neighbour of neighboursArr) {
			const neighbourStr = JSON.stringify(neighbour);
			if (!visitedCells.has(neighbourStr)) {
				queue.push(neighbour);
				predecessors.set(neighbourStr, currentStr);
			}
		}
	}

	// no path found
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

	const allNeighbours = [NC, WC, EC, SC];

	for (const neighbour in allNeighbours) {
		const targetNeighbour = allNeighbours[neighbour];

		// INFO: Gaurd against invalid indexes, ensure all indexes >= 0
		if (targetNeighbour[0] >= 0 && targetNeighbour[1] >= 0) {
			// INFO: Gaurd against out-of-range indexes i.e. index < elements in array
			if (targetNeighbour[0] < rowMax && targetNeighbour[1] < colMax) {
				const targetRow = targetNeighbour[0];
				const targetCol = targetNeighbour[1];

				if (maze[targetRow][targetCol].type !== cells.wall.name) {
					// INFO: Gaurd against wall cells
					neighbours.push(targetNeighbour);
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

function dfs() {
	console.log("DFS coming soon....");
}

export { bfs, dfs };
