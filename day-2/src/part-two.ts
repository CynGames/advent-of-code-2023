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

type MinimumCubeParameters = {
  red: CubeAmount,
  green: CubeAmount,
  blue: CubeAmount,
}

type CubeAmount = {
  amount: number
}

let AGGREGATED_RESULTS = 0;

export async function partTwo() {
  const rl = await readInput();

  for await (const line of rl) {
    AGGREGATED_RESULTS += parseInput(line);
  }

  console.log(AGGREGATED_RESULTS)
}

function parseInput(input: string): number {
  const cubeSetsRaw = input.split(':').pop()?.trimStart()!;

  return parseCubeSets(cubeSetsRaw);
}

function parseCubeSets(cubeSetsRaw: string): number {
  const cubeSetsRawArray = cubeSetsRaw.split(';').map(set => set.trim());
  const cubesRequired: MinimumCubeParameters = {red: {amount: 0}, green: {amount: 0}, blue: {amount: 0}};
  
  for (const cubeSetRaw of cubeSetsRawArray) {
    const cubeRawArray = cubeSetRaw.split(',').map(element => element.trim())
    
    for (const cubeRaw of cubeRawArray) {
      const cubeArray = cubeRaw.split(' ').map(element => element.trim())
      const currentCube = parseCube(cubeArray);
      
      compareCube(currentCube, cubesRequired)
    }
  }
  
  return calculateCubePower(cubesRequired)
}

function compareCube(currentCube: Cube, cubesRequired: MinimumCubeParameters) {
  switch (currentCube.color) {
    case 'red':
      if (currentCube.number > cubesRequired.red.amount) {
        cubesRequired.red.amount = currentCube.number;
      }
      break;
    case 'green':
      if (currentCube.number > cubesRequired.green.amount) {
        cubesRequired.green.amount = currentCube.number;
      }
      break;
    case 'blue':
      if (currentCube.number > cubesRequired.blue.amount) {
        cubesRequired.blue.amount = currentCube.number;
      }
      break;
  }
}

function parseCube(cubeRaw: string[]): Cube {
  return {
    number: parseInt(cubeRaw[0]),
    color: cubeRaw[1]
  }
}

function calculateCubePower(cubesRequired: MinimumCubeParameters): number {
  return cubesRequired.green.amount * cubesRequired.blue.amount * cubesRequired.red.amount;
}

