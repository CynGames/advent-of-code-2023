import {Input, readInput} from "./helper/helper";

let FINAL_VALUE: number = 0;

export async function partOne() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    const originalSequence = parseInput(line)!;
    const zeroedSequence = subtractToZero(originalSequence);
    const result = getNextValueInHistory(zeroedSequence);
    
    FINAL_VALUE += result;
  }
  
  console.log(`Result Part One: ${FINAL_VALUE}`);
}

function getNextValueInHistory(zeroedSequence: Array<number[]>): number {
  let offset = 1;
  let x_length = zeroedSequence[zeroedSequence.length - 1].push(0) - 1;
  let y_length = zeroedSequence.length - offset;
  
  while (y_length > 0) {
     const lastValueBottom = zeroedSequence[y_length][x_length];
     const lastValueTop = zeroedSequence[y_length - offset][x_length];
     const newLastValue = lastValueBottom + lastValueTop;
     
     x_length = zeroedSequence[y_length - offset].push(newLastValue) - 1;
     y_length -= offset;
  }
  
  return zeroedSequence[y_length][x_length];
}

function subtractToZero(originalSequence: number[]): Array<number[]> {
  const completeSequencesArray: Array<number[]> = [originalSequence];

  while (!isFinalSequenceZero(completeSequencesArray[completeSequencesArray.length - 1])) {
    const evaluatedSequenceArray = completeSequencesArray[completeSequencesArray.length - 1];
    
    const subtractedArray = evaluatedSequenceArray
      .slice(1)
      .map((current, i) => current - evaluatedSequenceArray[i]);
    
    completeSequencesArray.push(subtractedArray);
  }
  
  return completeSequencesArray;
}

function isFinalSequenceZero(completeSequenceArray: number[]): boolean {
  return completeSequenceArray.every(value => value === 0);
}

function parseInput(line: string) {
  if (line.trim() === '') return;
  
  return line
    .split(' ')
    .map(Number);
}
