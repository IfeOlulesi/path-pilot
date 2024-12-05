import { create } from "zustand";

export const useAppStore = create((set) => ({
	// constants
	DRAWER_WIDTH: 200,
	NAVBAR_HEIGHT: 65,
  CELL_WIDTH: 20, // infer that each cell is a square

	// variables
	expandedDrawerNav: null,

	// mazeRows: 20,
	// mazeCols: 30,
	startPos: null,
	endPos: null,
	mazeData: [],

	currentTool: "wall",

	// actions
	expandDrawerNav: (navId) =>
		set((state) => {
			if (state.expandedDrawerNav === navId) {
				return {
					expandedDrawerNav: null,
				};
			}

			return {
				expandedDrawerNav: navId,
			};
		}),

	initializeMaze: (mazeRows, mazeCols) =>
		set(() => {
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
			console.log(row, col);
			console.log(updates);
			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),
}));
