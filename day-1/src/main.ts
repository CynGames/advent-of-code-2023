import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

async function readInput(): Promise<void> {
  const pathToFile = path.join(__dirname, `./data/input.txt`);
  const fileStream = fs.createReadStream(pathToFile);
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let aggregatedResult = 0;
  
  for await (const line of rl) {
    const result = processLine(line);
    
    aggregatedResult += result;
  }
  
  console.log(aggregatedResult)
}

function processLine(line: string): number {
  const result = parseInt(line.replace(/[^0-9\.]/g, ''))
  const arr = Array.from(result.toString(), Number);
  
  const firstNumber = arr[0];
  const lastNumber = arr[arr.length - 1];
  const combinedNumbers = firstNumber.toString() + lastNumber.toString();
  
  return parseInt(combinedNumbers);
}

void readInput();