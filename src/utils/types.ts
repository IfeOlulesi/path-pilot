// INFO: types
export type CellCoordinatesArr = [number, number];

// INFO: interfaces
export interface CellCoordinatesObj {
	row: number;
	col: number;
	type: string;
}

export interface ReconstructPathParams {
	predecessors: Map<string, string>;
	start: CellCoordinatesArr;
	end: CellCoordinatesArr;
}

export interface Updates {
	type: string;
}

export interface Algorithm {
	key: string;
	sName: string;
	lName: string;
}

export interface AppStoreProps {
	// constants
	DRAWER_WIDTH: number;
	NAVBAR_HEIGHT: number;
	STATUS_BAR_HEIGHT: number;
	CELL_WIDTH: number;
	VISITED_CELL_DELAY: number;
	PATH_CELL_DELAY: number;

	// variables
	startPos: { row: number; col: number } | null;
	endPos: { row: number; col: number } | null;
	mazeData: Array<
		Array<{
			type: string;
			row: number;
			col: number;
		}>
	>;
	currentTool: string;
	currentAlgo: Algorithm;

	// actions
	initializeMaze: () => void;
	updateCell: (row: number, col: number, updates: { type: string }) => void;
	setCurrentTool: (tool: string) => void;
	setCurrentAlgo: (algo: Algorithm) => void;
	findShortestPath: () => void;
	prepMazeForNewVisualization: () => void;
}
