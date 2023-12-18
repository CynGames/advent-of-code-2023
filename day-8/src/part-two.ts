import {Input, readInput} from "./helper/helper";

const directionsMap = new Map<string, { left: string; right: string }>();
let traverseOrder = '';

export async function partTwo() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  executeTraverse();
}

function executeTraverse() {
  const aEndingOrigins = Array
    .from(directionsMap.keys())
    .filter(origin => origin.endsWith('A'));
  
  let paths = aEndingOrigins.map(origin => ({
    currentOrigin: origin,
    destinationOrigin: origin.replace('A','Z'),
    completed: false
  }))
  
  let orderIndex = 0;
  let timesTraversed = 0;
  
  while (!paths.every(path => path.completed)) {
    paths.forEach(path => {
      const currentChar = traverseOrder[orderIndex];
      const currentDirections = directionsMap.get(path.currentOrigin);
      
      if (!currentDirections) {
        console.log(`No dirs foundoda for ${currentDirections}`);
        path.completed = true;
        
        return;
      }
      
      path.currentOrigin = currentChar === 'L' ? currentDirections.left : currentDirections.right;
      path.completed = path.currentOrigin === path.destinationOrigin;
      
      console.log(path);
    })
    
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
}
