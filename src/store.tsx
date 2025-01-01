import { create } from "zustand";
import { tools, algorithms, cells } from "@/utils/constants";
import { bfs } from "./utils/algos";
import {
	CellCoordinatesArr,
	AppStoreProps,
	Updates,
	Algorithm,
} from "./utils/types";

export const useAppStore = create<AppStoreProps>()((set) => ({
	// constants - should probably move them to constants.ts
	DRAWER_WIDTH: 200,
	NAVBAR_HEIGHT: 65,
	STATUS_BAR_HEIGHT: 65,
	CELL_WIDTH: 50, // infer that each cell is a square
	VISITED_CELL_DELAY: 1,
	PATH_CELL_DELAY: 1,

	// variables
  totalCells: 0,
  mazeRows: 0,
  mazeCols: 0,
	startPos: null,
	endPos: null,
	mazeData: [],
	currentTool: tools.wall, // wall tool is the default tool
	currentAlgo: algorithms.bfs, // bfs is the default (lol, only) algorithm

	visualizationRunning: false,
	finishNodeSearchRunning: false,
	pathConnectionRunning: false,
	wasPathFound: null,

	// actions
	initializeMaze: () => 
		set((state: AppStoreProps) => {
			// INFO: Reset all variables
			set(() => ({
				...state,
				startPos: null,
				endPos: null,
				mazeData: [],
				visualizationRunning: false,
				finishNodeSearchRunning: false,
				pathConnectionRunning: false,
				wasPathFound: null,
			}));

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
			return {
				mazeData: newMazeData,
				totalCells: mazeRows * mazeCols,
				mazeRows,
				mazeCols,
			};
		}),
    
	updateCell: (row: number, col: number, updates: Updates) =>
		set((state: AppStoreProps) => {
			const newMazeData = [...state.mazeData];

			// INFO: If first time setting start pos, set startPos to current cell
			if (updates.type === cells.begin.name && state.startPos === null) {
				newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
				return { mazeData: newMazeData, startPos: { row, col } };

				// INFO: Else, reset old start pos and set new start pos
			} else if (updates.type === cells.begin.name && state.startPos !== null) {
				// INFO: reset former start cell
				newMazeData[state.startPos.row][state.startPos.col] = {
					...state.startPos,
					type: cells.default.name,
				};

				// INFO: set new start cell
				newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
				return { mazeData: newMazeData, startPos: { row, col } };
			}

			if (updates.type === cells.finish.name && state.endPos === null) {
				newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
				return { mazeData: newMazeData, endPos: { row, col } };

				// INFO: if not, reset old end pos and set new end pos
			} else if (updates.type === cells.finish.name && state.endPos !== null) {
				// INFO: reset former end cell
				newMazeData[state.endPos.row][state.endPos.col] = {
					...state.endPos,
					type: cells.default.name,
				};

				newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
				return { mazeData: newMazeData, endPos: { row, col } };
			}

			// INFO: if not start or end, update cell
			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),

	setCurrentTool: (tool: string) => set(() => ({ currentTool: tool })),

	setCurrentAlgo: (algo: Algorithm) => set(() => ({ currentAlgo: algo })),

	findShortestPath: () =>
		set((state: AppStoreProps) => {
			// Reset all variables
			set(() => ({
				...state,
				visualizationRunning: false,
				finishNodeSearchRunning: false,
				pathConnectionRunning: false,
				wasPathFound: null,
			}));

			// Guard clause - tho it should never hit since it's checked in the UI
			if (state.startPos === null || state.endPos === null) {
				alert("Choose starting and ending point");
				return { mazeData: state.mazeData };
			}

			const startPosArr: CellCoordinatesArr = [state.startPos.row, state.startPos.col];
			const endPosArr: CellCoordinatesArr = [state.endPos.row, state.endPos.col];

			const onVisitHandler = (cell: CellCoordinatesArr) => {
				return new Promise<void>((resolve) => {
					const startTime = performance.now();
					const frameDelay = state.VISITED_CELL_DELAY;

					const animate = (currentTime: number) => {
						if (currentTime - startTime >= frameDelay) {
							set((state) => {
								const newMazeData = [...state.mazeData];
								if (
									cell !== null &&
									state.startPos !== null &&
									(cell[0] !== state.startPos.row || cell[1] !== state.startPos.col)
								) {
									newMazeData[cell[0]][cell[1]] = {
										type: cells.visited.name,
										row: cell[0],
										col: cell[1],
									};
								}
								return { mazeData: newMazeData };
							});
							resolve();
						} else {
							requestAnimationFrame(animate);
						}
					};

					requestAnimationFrame(animate);
				});
			};

			const onPathFoundHandler = (path: CellCoordinatesArr[]) => {
				set(() => ({
					...state,
					finishNodeSearchRunning: false,
					pathConnectionRunning: true,
				}));

				const pathWithoutStartEnd = path.slice(1, -1);
				
				return new Promise<void>((resolve) => {
					let currentIndex = 0;
					const startTime = performance.now();
					const frameDelay = state.PATH_CELL_DELAY;

					const animate = (currentTime: number) => {
						if (currentTime - startTime >= frameDelay * currentIndex) {
							if (currentIndex < pathWithoutStartEnd.length) {
								const cell = pathWithoutStartEnd[currentIndex];
								set((state) => {
									const newMazeData = [...state.mazeData];
									newMazeData[cell[0]][cell[1]] = {
										type: cells.path.name,
										row: cell[0],
										col: cell[1],
									};
									return { mazeData: newMazeData };
								});
								currentIndex++;
								requestAnimationFrame(animate);
							} else {
								set(() => ({
									...state,
									pathConnectionRunning: false,
									wasPathFound: true,
								}));
								resolve();
							}
						} else {
							requestAnimationFrame(animate);
						}
					};

					requestAnimationFrame(animate);
				});
			};

			const onPathNotFoundHandler = () => {
				set(() => ({
					...state,
					visualizationRunning: false,
					finishNodeSearchRunning: false,
					wasPathFound: false,
				}));
			};

			set(() => ({
				...state,
				visualizationRunning: true,
				finishNodeSearchRunning: true,
			}));

			bfs(
				startPosArr,
				endPosArr,
				state.mazeData,
				onVisitHandler,
				onPathFoundHandler,
				onPathNotFoundHandler
			);

			return { mazeData: state.mazeData };
		}),

	prepMazeForNewVisualization: () => {
		set((state) => {
			const newMazeData = [...state.mazeData];

			// INFO: Reset all cells to default
			for (let row = 0; row < newMazeData.length; row++) {
				for (let col = 0; col < newMazeData[row].length; col++) {
					if (
						newMazeData[row][col].type !== cells.wall.name &&
						newMazeData[row][col].type !== cells.begin.name &&
						newMazeData[row][col].type !== cells.finish.name
					) {
						newMazeData[row][col] = {
							type: cells.default.name,
							row,
							col,
						};
					}
				}
			}

			return { mazeData: newMazeData };
		});
	},
}));
