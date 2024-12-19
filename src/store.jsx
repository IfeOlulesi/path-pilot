import { create } from "zustand";
import { tools, algorithms } from "@/utils/constants";
import { bfs } from "./utils/algos";

export const useAppStore = create((set) => ({
	// constants
	DRAWER_WIDTH: 200,
	NAVBAR_HEIGHT: 65,
	STATUS_BAR_HEIGHT: 65,
	CELL_WIDTH: 40, // infer that each cell is a square

	// variables
	startPos: null,
	endPos: null,
	mazeData: [],
	currentTool: tools.wall, // wall tool is the default tool
	currentAlgo: algorithms.bfs, // bfs is the default (lol, only) algorithm

	// actions
	initializeMaze: () =>
		set((state) => {
			const MAZE_HEIGHT =
				window.innerHeight - state.NAVBAR_HEIGHT - state.STATUS_BAR_HEIGHT;
			const MAZE_WIDTH = window.innerWidth - state.DRAWER_WIDTH;

			const mazeRows = Math.floor(MAZE_HEIGHT / state.CELL_WIDTH);
			const mazeCols = Math.floor(MAZE_WIDTH / state.CELL_WIDTH);

			const newMazeData = Array(mazeRows)
				.fill()
				.map((_, row) =>
					Array(mazeCols)
						.fill()
						.map((_, col) => ({
							type: "none",
							row,
							col,
						}))
				);
			return { mazeData: newMazeData };
		}),

	updateCell: (row, col, updates) =>
		set((state) => {
			const newMazeData = [...state.mazeData];
			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };

			// INFO: If first time setting start pos, set startPos to current cell
			if (updates.type === tools.begin && state.startPos === null) {
				return { mazeData: newMazeData, startPos: { row, col } };

				// INFO: Else, reset old start pos and set new start pos
			} else if (updates.type === tools.begin && state.startPos !== null) {
				// INFO: reset former start cell
				newMazeData[state.startPos.row][state.startPos.col] = {
					...state.startPos,
					type: "none",
				};
				return { mazeData: newMazeData, startPos: { row, col } };
			}

			if (updates.type === tools.finish && state.endPos === null) {
				return { mazeData: newMazeData, endPos: { row, col } };

				// INFO: if not, reset old end pos and set new end pos
			} else if (updates.type === tools.finish && state.endPos !== null) {
				// INFO: reset former end cell
				newMazeData[state.endPos.row][state.endPos.col] = {
					...state.endPos,
					type: "none",
				};
				return { mazeData: newMazeData, endPos: { row, col } };
			}

			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),

	setCurrentTool: (tool) => set(() => ({ currentTool: tool })),

	setCurrentAlgo: (algo) => set(() => ({ currentAlgo: algo })),

	findShortestPath: () =>
		set((state) => {
			const startPosArr = [state.startPos.row, state.startPos.col];
			const endPosArr = [state.endPos.row, state.endPos.col];
			const shortestPath = bfs(startPosArr, endPosArr, state.mazeData);
			const newMazeData = [...state.mazeData];

			if (shortestPath) {
				// INFO: Remove first and last elements
				const pathWithoutStartEnd = shortestPath.slice(1, -1);

				// INFO: Only color the intermediate path cells
				for (const node in pathWithoutStartEnd) {
					const cords = pathWithoutStartEnd[node];
					newMazeData[cords[0]][cords[1]] = {
						type: tools.path,
						row: cords[0],
						col: cords[1],
					};
				}

				return { mazeData: newMazeData };
			}

			alert("Path not found");
			return { mazeData: newMazeData };
		}),
}));
