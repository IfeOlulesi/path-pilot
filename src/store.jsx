import { create } from "zustand";
import { tools } from "@/utils/constants";

export const useAppStore = create((set) => ({
	// constants
	DRAWER_WIDTH: 200,
	NAVBAR_HEIGHT: 65,
	CELL_WIDTH: 20, // infer that each cell is a square

	// variables
	// mazeRows: 20,
	// mazeCols: 30,
	startPos: null,
	endPos: null,
	mazeData: [],
	currentTool: tools.wall,

	// actions

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
			const oldCurrentCell = state.mazeData[row][col];
      newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
      
			console.log("oldCurrentCell: ", oldCurrentCell);
			console.log("state.startPos: ", state.startPos);
			console.log("updates: ", updates);
      
			// if first time setting start pos, set startPos to current cell
			if (updates.type === tools.begin && state.startPos === null) {
				return { mazeData: newMazeData, startPos: { row, col } };

				// if not, reset old start pos and set new start pos
			} else if (updates.type === tools.begin && state.startPos !== null) {
				// reset former start cell
				newMazeData[state.startPos.row][state.startPos.col] = {
					...state.startPos,
					type: "none",
				};
				return { mazeData: newMazeData, startPos: { row, col } };
			}

      if (updates.type === tools.finish && state.endPos === null) {
				return { mazeData: newMazeData, endPos: { row, col } };

				// if not, reset old end pos and set new end pos
			} else if (updates.type === tools.finish && state.endPos !== null) {
				// reset former end cell
				newMazeData[state.endPos.row][state.endPos.col] = {
					...state.endPos,
					type: "none",
				};
				return { mazeData: newMazeData, endPos: { row, col } };
			}

			// if (updates.type === tools.finish && state.endPos === null) {
			//   newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			//   return { mazeData: newMazeData, endPos: { row, col } };
			// }
			// console.log(row, col);
			// console.log(updates);
			newMazeData[row][col] = { ...newMazeData[row][col], ...updates };
			return { mazeData: newMazeData };
		}),

	setCurrentTool: (tool) => set(() => ({ currentTool: tool })),
}));
