import {Input, readInput} from "./helper/helper";

const directionsMap = new Map<string, { left: string; right: string }>();

const startingOrigin = 'AAA';
let traverseOrder = '';

export async function partOne() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  executeTraverse();
}

function executeTraverse() {
  let currentOrigin = startingOrigin;
  
  let orderIndex = 0;
  let timesTraversed = 0;
  
  while(currentOrigin !== 'ZZZ') {
    const currentChar  = traverseOrder[orderIndex];
    const currentDirections = directionsMap.get(currentOrigin);
    
    if (!currentDirections) {
      console.log(`No dirs foundoda for ${currentDirections}`);
      break;
    }
    
    currentOrigin = currentChar === 'L' ? currentDirections.left : currentDirections.right;
    
    orderIndex = (orderIndex + 1) % traverseOrder.length;
    timesTraversed++;
  }
  
  console.log(timesTraversed);
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
  
  
  const directionObject = {
    origin: node,
    directions: {
      left,
      right
    }
  }
  
  console.log(directionObject);
}
