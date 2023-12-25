import {alternativeReadInput, Input, readInput} from "./helper/helper";

type Coords = {
  id: number,
  x: number,
  y: number,
}

const GalaxiesCoords = new Array<Coords>();

export async function partOne() {
  const matrix = await alternativeReadInput(Input.TEST)
    .then(value => value.replace(/\r\n/g, '\n'))
    .then(value => value.split('\n'));
  
  expandInput(matrix);
  assignNumbersToGalaxies(matrix);
  getShortestPath();
}

function getShortestPath() {
  let overallResult = 0;
  
  for (let target = 0; target < GalaxiesCoords.length; target++) {
    let targetResult = 0;
    
    for (let index = target; index < GalaxiesCoords.length; index++) {
      if (GalaxiesCoords[target].id === GalaxiesCoords[index].id) continue;
      
      const xDiff = GalaxiesCoords[target].x - GalaxiesCoords[index].x;
      const yDiff = GalaxiesCoords[target].y - GalaxiesCoords[index].y;
      targetResult = Math.abs(xDiff) + Math.abs(yDiff);
      overallResult += targetResult;
    }
  }
  
  console.log(overallResult);
}

function assignNumbersToGalaxies(matrix: string[]) {
  let id = 1;
  
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y].split('');
    
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        row[x] = id.toString();
        GalaxiesCoords.push({id, x, y})
        id++;
      }
    }
    
    matrix[y] = row.join('');
  }
  
  // console.log(GalaxiesCoords);
  
  return matrix;
}

function expandInput(matrix: string[]): string[] {
  let hasToAddCol = true;
  
  for (let y = 0; y < matrix.length; y++) {
    if (!matrix[y].includes('#')) {
      matrix.splice(y, 0, '.'.repeat(matrix[y].length));
      y++
    }
  }
  
  for (let x = 0; x < matrix[0].length; x++) {
    hasToAddCol = true;
    
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[y][x] === '#') hasToAddCol = false;
      
      if (y === matrix.length - 1 && hasToAddCol) {
        insertColumn(matrix, x);
        
        x++;
      }
    }
  }
  
  // printMatrixToConsole(matrix);
  
  return matrix;
}

function insertColumn(matrix: string[], x: number) {
  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i].split('');
    row.splice(x, 0, '.');
    matrix[i] = row.join('');
  }
}

function printMatrixToConsole(matrix: string[]) {
  for (let z = 0; z < matrix.length; z++) {
    console.log(matrix[z]);
  }
}