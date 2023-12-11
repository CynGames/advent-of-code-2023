import {readInput} from "./helper/helper";

type Symbol = {
  type: string,
  coords: Coords
}

type Coords = {
  x: number,
  y: number
}

const SYMBOL_TYPES = ['+', '-', '*', '/', '=', '&', '%', '#', '$', '@'];
const INPUT_MATRIX: string[] = new Array<string>();

const right = 1;
const top = -1;
const left = -1;
const bottom = 1;

export async function partOne() {
  const rl = await readInput();
  
  for await (const line of rl) {
    INPUT_MATRIX.push(line);
  }
  
  parseInput();
}

function parseInput(): void {
  const symbols = grabAllSymbols();
  const findRelevantNumbers = grabAdjacentNumbers(symbols);
  
  const finalResult = findRelevantNumbers.reduce((sum, num) => sum + num);
  
  console.log(finalResult);
}

function grabAdjacentNumbers(symbols: Symbol[]): number[] {
  const results: number[] = [];
  
  for (const symbol of symbols) {
    traverseXRevised(symbol.coords.x + right, symbol.coords.y, '', true);
    traverseXRevised(symbol.coords.x + left, symbol.coords.y, '', false);
    
    peekYRevised(symbol.coords.x, symbol.coords.y + top, true);
    peekYRevised(symbol.coords.x, symbol.coords.y + bottom, true);
  }
  
  function traverseXRevised(position_x: number, position_y: number, previousValue: string, isTraversingRight: boolean) {
    const value = +INPUT_MATRIX[position_y]?.charAt(position_x);
    
    if (isNaN(value) || INPUT_MATRIX[position_y]?.charAt(position_x) == '') {
      
      // If it's a symbol
      if (previousValue === '') return;
      
      const parsedResult = parseInt(previousValue);
      results.push(parsedResult);
      
      return;
    }
    
    
    if (isTraversingRight)
      previousValue = previousValue + value;
    else
      previousValue = value + previousValue;
    
    const newPosition_x = isTraversingRight ? position_x + right : position_x + left;
    
    traverseXRevised(newPosition_x, position_y, previousValue, isTraversingRight)
  }
  
  function peekYRevised(position_x: number, position_y: number, isTraversingRight: boolean) {
    const value = +INPUT_MATRIX[position_y]?.charAt(position_x);
    
    if (isNaN(value) || INPUT_MATRIX[position_y]?.charAt(position_x) == '') {
      peekDiagonal(position_x + right, position_y, isTraversingRight);
      peekDiagonal(position_x + left, position_y, !isTraversingRight);
      
      return;
    }
    
    const newPosition_x = isTraversingRight ? position_x + right : position_x + left;
    
    peekXRevised(newPosition_x, position_y, isTraversingRight);
  }
  
  function peekDiagonal(position_x: number, position_y: number, isTraversingRight: boolean) {
    const value = +INPUT_MATRIX[position_y]?.charAt(position_x);
    
    if (isNaN(value) || INPUT_MATRIX[position_y]?.charAt(position_x) == '') {
      return;
    }
    
    const newPosition_x = isTraversingRight ? position_x + right : position_x + left;
    
    peekXRevised(newPosition_x, position_y, isTraversingRight);
  }
  
  function peekXRevised(position_x: number, position_y: number, isTraversingRight: boolean) {
    const value = +INPUT_MATRIX[position_y]?.charAt(position_x);
    
    if (isNaN(value) || INPUT_MATRIX[position_y]?.charAt(position_x) == '') {
      const previousPosition_x = isTraversingRight ? position_x + left : position_x + right;
      
      traverseXRevised(previousPosition_x, position_y, '', !isTraversingRight)
      
      return;
    }
    
    const newPosition_x = isTraversingRight ? position_x + right : position_x + left;
    
    peekXRevised(newPosition_x, position_y, isTraversingRight);
  }
  
  return results;
}

function grabAllSymbols(): Symbol[] {
  const symbols = [];
  
  for (const symbolType of SYMBOL_TYPES) {
    let lastKnownPosition = -1;
    
    for (let y = 0; y < INPUT_MATRIX.length; y++) {
      while (true) {
        const x = INPUT_MATRIX[y]?.indexOf(symbolType, lastKnownPosition + 1);
        
        if (x === -1) {
          lastKnownPosition = x;
          break;
        }
        
        const symbol: Symbol = {
          type: symbolType,
          coords: {
            x,
            y
          }
        }
        
        symbols.push(symbol);
        lastKnownPosition = x;
      }
    }
  }
  
  return symbols;
}