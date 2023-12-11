import * as readline from 'readline';
import {readInput} from "./helper/helper";

const digitsAsStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const digitsAsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const startingWords = ['o', 't', 'f', 's', 'e', 'n'];

export async function partTwo() {
  const rl = await readInput();
  await calculatePartTwo(rl);
}

async function calculatePartTwo(rl: readline.Interface): Promise<void> {
  let aggregatedResult = 0;
  
  for await (const line of rl) {
    aggregatedResult += await processLine(line);
  }
  
  console.log(`Part Two: ${aggregatedResult}`)
}

async function processLine(originalLine: string): Promise<number> {
  let currentLine = originalLine;
  let outputArr = [];
  
  for (let index = 0; index < originalLine.length; index++) {
    let firstLetter = currentLine[0];
    
    if (startingWords.includes(firstLetter)) {
      
      const potentialDays = digitsAsStrings.filter((digit) => digit[0] === firstLetter)
      
      for (let i = 0; i < potentialDays.length; i++) {
        const substringOutput = currentLine.substring(0, potentialDays[i].length)
        
        if (potentialDays[i] === substringOutput) {
          const digitGrabbed = digitsAsNumbers[digitsAsStrings.indexOf(substringOutput)];
          outputArr.push(digitGrabbed)
        }
      }
    }
    
    if (parseInt(firstLetter)) outputArr.push(parseInt(firstLetter))
    
    currentLine = currentLine.slice(1);
  }
  
  const firstNumber = outputArr[0]
  const lastNumber = outputArr[outputArr.length - 1] ?? outputArr[0];
  const result = firstNumber.toString() + lastNumber.toString();
  
  return parseInt(result)
}
