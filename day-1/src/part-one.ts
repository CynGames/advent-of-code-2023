import * as readline from 'readline';
import {readInput} from "./helper/helper";

export async function partOne() {
  const rl = await readInput();
  await calculatePartOne(rl);
}

async function calculatePartOne(rl: readline.Interface): Promise<void> {
  let aggregatedResult = 0;
  
  for await (const line of rl) {
    const result = processLine(line);
    
    aggregatedResult += result;
  }
  
  console.log(`Part One: ${aggregatedResult}`)
}

function processLine(line: string): number {
  const result = parseInt(line.replace(/[^0-9\.]/g, ''))
  const arr = Array.from(result.toString(), Number);
  
  const firstNumber = arr[0];
  const lastNumber = arr[arr.length - 1];
  const combinedNumbers = firstNumber.toString() + lastNumber.toString();
  
  return parseInt(combinedNumbers);
}
