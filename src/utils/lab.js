function createGraph(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

const twoDGraph = createGraph(19, 15); // Create a 9x5 graph dynamically

function bfs(start, end) {
  var queue = [start]
  var visitedCells = new Set()
  var predecessors = new Map()

  while (queue.length > 0) {
    let current = queue.shift()

    // INFO: Destination node found
    if (JSON.stringify(current) === JSON.stringify(end)) {
      return reconstructPath(predecessors, start, end)
    }

    visitedCells.add(JSON.stringify(current))
    const neighboursArr = getNeighbours(current)

    // INFO: Explore the neighbors of current node
    for (let neighbour of neighboursArr) {
      const hasCellBeenVisited = visitedCells.has(JSON.stringify(neighbour))

      if (!hasCellBeenVisited) {
        queue.push(neighbour)
        visitedCells.add(JSON.stringify(neighbour)) // wondering why this line tho
        predecessors.set(JSON.stringify(neighbour), JSON.stringify(current)) // document the route to this node/cell
      }
    }
  }

  // no path found
  return false;
}

function getNeighbours(cell, graph = twoDGraph) {
  // should return an iterable: array
  // max of 4 neighbours, min of 3
  const [row, col] = cell;
  const neighbours = []

  // find dimension of graph - max x, max y
  // assuming all rows are equal in dim
  const rowMax = graph.length
  const colMax = graph[0].length

  // INFO: Initially considered adding diagonal nodes as valid neighbors,
  // INFO: Thought otherwise on second thought
  // const NW = [row - 1, col - 1]
  // const NE = [row - 1, col  + 1]
  // const SW = [row + 1, col - 1]
  // const SE = [row + 1, col  + 1]
  // const allNeighbours = [NW, NC, NE, WC, EC, SW, SC, SE]
  
  const NC = [row - 1, col]
  const SC = [row + 1, col]
  const WC = [row, col - 1]
  const EC = [row, col + 1]


  const allNeighbours = [NC, WC, EC, SC,]

  for (const neighbour in allNeighbours) {
    const targetNeighbour = allNeighbours[neighbour]

    // INFO: Gaurd against invalid indexes, ensure all indexes >= 0
    if (targetNeighbour[0] >= 0 && targetNeighbour[1] >= 0) {

      // INFO: Gaurd against out-of-range indexes i.e. index < elements in array
      if (targetNeighbour[0] < rowMax && targetNeighbour[1] < colMax) {
        neighbours.push(targetNeighbour)
      }
    }
  }

  return neighbours
}

function reconstructPath(predecessors, start, end) {
  let path = [end]
  let current = JSON.stringify(end)

  while (current !== JSON.stringify(start)) {
    current = predecessors.get(current)
    path.unshift(JSON.parse(current))
  }

  // at this point, path should contain the shortest path 
  return path
}


const startingPos = [2, 2]
const endingPos = [10, 14]

const shortestPath = bfs(startingPos, endingPos)

if (Array.isArray(shortestPath)) {
  for (const node in shortestPath) {
    const cords = shortestPath[node]
    twoDGraph[cords[0]][cords[1]] = "🟩"
  }
}

console.log(twoDGraph)