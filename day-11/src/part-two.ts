import {alternativeReadInput, Input, readInput} from "./helper/helper";

type Coords = {
  id: number,
  x: number,
  y: number,
}

const GalaxiesCoords = new Array<Coords>();

const col_gaps = new Array<number>();
const row_gaps = new Array<number>();

export async function partTwo() {
  const matrix = await alternativeReadInput(Input.REAL)
    .then(value => value.replace(/\r\n/g, '\n'))
    .then(value => value.split('\n'));
  
  expandInput(matrix);
  assignGalaxies(matrix);
  getShortestPath();
}

function getShortestPath() {
  let overallResult = 0;
  const multiplicationFactor = 999999;
  
  for (let target = 0; target < GalaxiesCoords.length; target++) {
    let targetResult = 0;
    
    for (let index = target; index < GalaxiesCoords.length; index++) {
      if (GalaxiesCoords[index].id === GalaxiesCoords[target].id) continue;
      
      const x_counter = timesGapIsCrossed(col_gaps, GalaxiesCoords[index].x, GalaxiesCoords[target].x);
      const y_counter = timesGapIsCrossed(row_gaps, GalaxiesCoords[index].y, GalaxiesCoords[target].y);
      
      let xDiff = Math.abs(GalaxiesCoords[target].x - GalaxiesCoords[index].x);
      let yDiff = Math.abs(GalaxiesCoords[target].y - GalaxiesCoords[index].y);
      
      if (x_counter > 0) xDiff = xDiff + (x_counter * multiplicationFactor);
      if (y_counter > 0) yDiff = yDiff + (y_counter * multiplicationFactor);
      
      targetResult = xDiff + yDiff;
      overallResult += targetResult;
    }
  }
  
  console.log(overallResult);
}

function timesGapIsCrossed(direction: number[], startPos: number, endPos: number): number {
  let counter = 0;
  
  for (let i = 0; i < direction.length; i++) {
    if (
      direction[i] > startPos && direction[i] < endPos ||
      direction[i] < startPos && direction[i] > endPos )
    counter++;
  }
  
  return counter;
}

function assignGalaxies(matrix: string[]) {
  let id = 1;
  
  for (let y = 0; y < matrix.length; y++) {
    const row = matrix[y].split('');
    
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
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
      row_gaps.push(y);
    }
  }
  
  for (let x = 0; x < matrix[0].length; x++) {
    hasToAddCol = true;
    
    for (let y = 0; y < matrix.length; y++) {
      if (matrix[y][x] === '#') hasToAddCol = false;
      
      if (y === matrix.length - 1 && hasToAddCol) {
        col_gaps.push(x);
      }
    }
  }
  
  // printMatrixToConsole(matrix);
  
  return matrix;
}

function printMatrixToConsole(matrix: string[]) {
  for (let z = 0; z < matrix.length; z++) {
    console.log(matrix[z]);
  }
}

