const cells = {
  wall: {
    color: "#1f2937",
    name: "wall"
  },
  begin: {
    color: "#22c55e",
    name: "begin"
  },
  finish: {
    color: "#ef4444",
    name: "finish"
  },
  path: {
    color: "#3b82f6",
    name: "path"
  },
  visited: {
    color: "#93c5fd",
    name: "visited"
  },
  default: {
    color: "#ffffff",
    name: "default"
  }
}

function createGraph(rows, cols) {
  return Array.from({ length: rows }, (_, elRow) => Array.from({ length: cols }, (_, elCol) => ({
    row: elRow,
    col: elCol,
    type: "none",
  })));
}
const twoDGraph = createGraph(50, 50); // Create a n x m graph dynamically

// Add diagonal walls
for (let i = 0; i < twoDGraph.length - 1; i++) {
  twoDGraph[i][i] = {
    row: i,
    col: i,
    type: cells.wall.name
  };
}

function bfs(start, end) {
  var queue = [start];
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
      console.log("Path found")
      console.log("counter", counter);
      return reconstructPath(predecessors, start, end);
    };

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
  console.log("No path found")
  console.log("counter", counter);
  return false;
}

function getNeighbours(cell, maze = twoDGraph) {
  const [row, col] = cell;
  const neighbours = [];
  // find dimension of graph - max x, max y
  // assuming all rows are equal in dim
  const rowMax = maze.length;
  const colMax = maze[0].length;
  const NC = [row - 1, col];
  const SC = [row + 1, col];
  const WC = [row, col - 1];
  const EC = [row, col + 1];
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

function reconstructPath(predecessors, start, end) {
  let path = [end];
  let current = JSON.stringify(end);
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

const startingPos = [0, 1];
const endingPos = [2,0];
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
    const cellType = twoDGraph[row][col].type
    if (cellType === 'path') {
      rowString += '⬛'
    } else if (cellType === "begin") {
      console.log('green')
      rowString += '🟩'
    } else if (cellType === 'finish') {
      console.log('red')
      rowString += '🟥'
    } else if (cellType === "wall") {
      rowString += "❎"
    }
    
    else {
      rowString += '⬜'
    }
  }
  console.log(rowString);
}
// console.log(twoDGraph);



