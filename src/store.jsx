import { create } from "zustand";

export const useAppStore = create((set) => ({
	expandedDrawerNav: null,

	mazeRows: 20,
	mazeCols: 30,
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

	initializeMaze: () =>
		set((state) => {
			const newMazeData = Array(state.mazeRows)
				.fill()
				.map((_, row) =>
					Array(state.mazeCols)
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
      console.log(row, col)
      console.log(updates)
			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),
}));
