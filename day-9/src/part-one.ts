import {Input, readInput} from "./helper/helper";

export async function partOne() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    parseInput(line);
  }
}

function parseInput(line: string) {
  if (line.trim() === '') return;
  
  const [node, directionStr] = line
    .split('=')
    .map(part => part.trim());
  
  const [left, right] = directionStr
    .split(',')
    .map(dir => dir.trim().replace(/\(|\)/g, ''));
}
