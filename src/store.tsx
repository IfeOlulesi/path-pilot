import { create } from "zustand";
import { tools, algorithms, cells } from "@/utils/constants";
import { bfs } from "./utils/algos";
import { CellCoordinatesArr, AppStoreProps, Updates, Algorithm } from "./utils/types";

export const useAppStore = create<AppStoreProps>((set) => ({
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
		set((state: AppStoreProps) => {
			const MAZE_HEIGHT =
				window.innerHeight - state.NAVBAR_HEIGHT - state.STATUS_BAR_HEIGHT;
			const MAZE_WIDTH = window.innerWidth - state.DRAWER_WIDTH;

			const mazeRows = Math.floor(MAZE_HEIGHT / state.CELL_WIDTH);
			const mazeCols = Math.floor(MAZE_WIDTH / state.CELL_WIDTH);

			const newMazeData = Array(mazeRows)
				.fill(null)
				.map((_, row) =>
					Array(mazeCols)
						.fill(null)
						.map((_, col) => ({
							type: cells.default.name,
							row,
							col,
						}))
				);
			return { mazeData: newMazeData };
		}),

	updateCell: (row: number, col: number, updates: Updates) =>
		set((state: AppStoreProps) => {
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
					type: cells.default.name,
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
					type: cells.default.name,
				};
				return { mazeData: newMazeData, endPos: { row, col } };
			}

			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),

	setCurrentTool: (tool: string) => set(() => ({ currentTool: tool })),

	setCurrentAlgo: (algo: Algorithm) => set(() => ({ currentAlgo: algo })),

	findShortestPath: () =>
		set((state: AppStoreProps) => {
			if (state.startPos === null || state.endPos === null) {
				alert("Choose starting and ending point");
				return { mazeData: state.mazeData };
			}
			const startPosArr: CellCoordinatesArr = [
				state.startPos.row,
				state.startPos.col,
			];
			const endPosArr: CellCoordinatesArr = [
				state.endPos.row,
				state.endPos.col,
			];
			const shortestPath = bfs(startPosArr, endPosArr, state.mazeData);
			const newMazeData = [...state.mazeData];

			if (shortestPath) {
				// INFO: Remove first and last elements
				const pathWithoutStartEnd = shortestPath.slice(1, -1);

				// INFO: Only color the intermediate path cells
				for (const node in pathWithoutStartEnd) {
					const cords = pathWithoutStartEnd[node];
					newMazeData[cords[0]][cords[1]] = {
						type: cells.path.name,
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
