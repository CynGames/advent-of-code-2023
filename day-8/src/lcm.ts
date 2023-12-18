import {Input, readInput} from "./helper/helper";

const directionsMap = new Map<string, { left: string; right: string }>();
let traverseOrder = '';

export async function lcmApproach() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  executeTraverse();
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function findPathLength(origin: string): number {
  let currentOrigin = origin;
  let length = 0;
  
  while (!currentOrigin.endsWith('Z')) {
    const currentChar = traverseOrder[length % traverseOrder.length];
    const currentDirections = directionsMap.get(currentOrigin);
    
    if (!currentDirections) {
      console.log(`No dirs foundoda for ${currentDirections}`);
    }
    
    currentOrigin = currentChar === 'L' ? currentDirections!.left : currentDirections!.right;
    length++
  }
  
  return length;
}

function executeTraverse() {
  const aEndingOrigins = Array.from(directionsMap.keys()).filter(origin => origin.endsWith('A'));
  const pathLengths = aEndingOrigins.map(findPathLength);
  const overallLCM = pathLengths.reduce((acc, length) => lcm(acc, length), 1);
  
  console.log(`Minimum steps required (LCM): ${overallLCM}`);
}

function parseInput(line: string) {
  if (traverseOrder == '') {
    traverseOrder = line.trim();
    
    return;
  }
  
  if (line.trim() === '') return;
  
  const [node, directionStr] = line
    .split('=')
    .map(part => part.trim());
  
  const [left, right] = directionStr
    .split(',')
    .map(dir => dir.trim().replace(/\(|\)/g, ''));
  
  directionsMap.set(node, {left, right});
}

void lcmApproach()
