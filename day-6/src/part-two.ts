import {Input, readInput} from "./helper/helper";

let race: Race;
const waysToWinPerRace = new Array<number>;

type Race = {
  time: number,
  distance: number
}

export async function partTwo() {
  const rl = await readInput(Input.REAL);
  await readAndParse(rl);
  
  const result = calculateWaysToWin(race.time, race.distance);
  waysToWinPerRace.push(result);
  
  const finalResult = waysToWinPerRace.reduce((previousValue, currentValue) => currentValue * previousValue);
  console.log(finalResult);
}

function calculateWaysToWin(raceTime: number, recordToBeat: number) {
  let waysToWin = 0;
  
  for (let tHeld = 0; tHeld < raceTime; tHeld++) {
    const realDistanceTraveled = tHeld * (raceTime - tHeld);
    if (realDistanceTraveled > recordToBeat) waysToWin++;
  }
  
  return waysToWin;
}

async function readAndParse(rl: any): Promise<void> {
  const rawData = new Array<number>;
  
  for await (const line of rl) {
    const output = parseInput(line);
    rawData.push(output);
  }
  
  race = {
    time: rawData[0],
    distance: rawData[1]
  }
}

function parseInput(line: string): number {
  return parseInt(line
    .split(' ')
    .map(Number).filter(value => value > 0)
    .join(''));
}
