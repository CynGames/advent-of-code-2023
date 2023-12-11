import {readInput} from "./helper/helper";

type Game = {
  gameId: number,
  set: CubeSet[],
}

type CubeSet = {
  cubeSet: Cube[],
}

type Cube = {
  number: number,
  color: string,
}

type GameValidity = {
  isGameValid: boolean
}

const BAG_OF_CUBES = {red: 12, green: 13, blue: 14};
let AGGREGATED_RESULTS = 0;

export async function partOne() {
  const rl = await readInput();
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  console.log(AGGREGATED_RESULTS);
}

function parseInput(input: string): void {
  const gameValidity: GameValidity = {isGameValid: true};
  const gameTagRaw = input.split(':').shift()?.trimEnd()!;
  const cubeSetsRaw = input.split(':').pop()?.trimStart()!;
  
  const gameId = parseGameId(gameTagRaw);
  const cubeSets = parseCubeSets(cubeSetsRaw, gameValidity);
  
  if (!gameValidity.isGameValid) {
    console.log(`Game ${gameId} is INVALID`);
    
    return;
  }
  
  const game: Game = {
    gameId: gameId,
    set: cubeSets
  }
  
  AGGREGATED_RESULTS += gameId;
  
  console.log(`Game ${gameId} is VALID`);
}

function parseGameId(gameTagRaw: string): number {
  return +gameTagRaw.substring(5, gameTagRaw?.length)
}

function parseCubeSets(cubeSetsRaw: string, gameValidity: GameValidity): CubeSet[] {
  const cubeSetsRawArray = cubeSetsRaw.split(';').map(set => set.trim());
  const gameSet: CubeSet[] = [];
  
  for (const cubeSetRaw of cubeSetsRawArray) {
    const cubeRawArray = cubeSetRaw.split(',').map(element => element.trim())
    const cubeSet: Cube[] = [];
    
    for (const cubeRaw of cubeRawArray) {
      const cubeArray = cubeRaw.split(' ').map(element => element.trim())
      const cube = parseCube(cubeArray);
      gameValidity.isGameValid = isCubePossible(cube);
      
      if (!gameValidity.isGameValid) break;
      
      cubeSet.push(cube)
    }
    
    if (!gameValidity.isGameValid) break;
    
    gameSet.push({cubeSet});
  }
  
  return gameSet;
}

function isCubePossible(cube: Cube): boolean {
  switch (cube.color) {
    case 'red':
      return cube.number <= BAG_OF_CUBES.red;
    
    case 'green':
      return cube.number <= BAG_OF_CUBES.green;
    
    case 'blue':
      return cube.number <= BAG_OF_CUBES.blue;
    
    default:
      return false;
  }
}

function parseCube(cubeRaw: string[]): Cube {
  return {
    number: parseInt(cubeRaw[0]),
    color: cubeRaw[1]
  }
}

