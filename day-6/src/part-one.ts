import {Input, readInput} from "./helper/helper";

const waysToWinPerRace = new Array<number>;
const Races = new Array<Race>;

type Race = {
  time: number,
  distance: number
}

export async function partOne() {
  const rl = await readInput(Input.REAL);
  await readAndParse(rl);
  
  for (const race of Races) {
    const result = calculateWaysToWin(race.time, race.distance);
    waysToWinPerRace.push(result);
  }
  
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
  const rawData = new Array<number[]>;
  
  for await (const line of rl) {
    const result = parseInput(line);
    rawData.push(result);
  }
  
  for (let x = 0; x < rawData[0].length; x++) {
    const raceObj = {
      time: rawData[0][x],
      distance: rawData[1][x]
    } as Race;
    
    Races.push(raceObj);
  }
}

function parseInput(line: string): number[] {
  return line.split(' ').map(Number).filter(value => value > 0)
}
