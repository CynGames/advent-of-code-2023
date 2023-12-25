import {Input, readInput} from "./helper/helper";

let FINAL_VALUE: number = 0;

export async function partTwo() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    const originalSequence = parseInput(line)!;
    const zeroedSequence = subtractToZero(originalSequence);
    const result = getNextValueInHistory(zeroedSequence);
    
    FINAL_VALUE += result;
  }
  
  console.log(`Result Part Two: ${FINAL_VALUE}`);
}

function getNextValueInHistory(zeroedSequence: Array<number[]>): number {
  let offset = 1;
  let y_length = zeroedSequence.length - offset;
  
  zeroedSequence[zeroedSequence.length - offset].unshift(0);
  
  while (y_length > 0) {
    const firstValueBottom = zeroedSequence[y_length][0];
    const firstValueTop = zeroedSequence[y_length - offset][0];
    const newFirstValue = firstValueTop - firstValueBottom;
    
    zeroedSequence[y_length - offset].unshift(newFirstValue);
    y_length -= offset;
  }
  
  return zeroedSequence[y_length][0];
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
