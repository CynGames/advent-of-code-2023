import {Input, readInput} from "./helper/helper";

type Seeds = {
  seedNumber: number,
  range: number
}

type SourceToDestination = {
  destination: number,
  source: number,
  range: number
}

let categoryIndex = -1;
let seedData = new Array<Seeds>;

const soilAlmanacData = new Array<SourceToDestination>;
const fertilizerAlmanacData = new Array<SourceToDestination>;
const waterAlmanacData = new Array<SourceToDestination>;
const lightAlmanacData = new Array<SourceToDestination>;
const temperatureAlmanacData = new Array<SourceToDestination>;
const humidityAlmanacData = new Array<SourceToDestination>;
const locationAlmanacData = new Array<SourceToDestination>;

const bundledData = [
  soilAlmanacData,
  fertilizerAlmanacData,
  waterAlmanacData,
  lightAlmanacData,
  temperatureAlmanacData,
  humidityAlmanacData,
  locationAlmanacData
];

let winningNumber = -1;

export async function partTwoCorrectSolution() {
  const rl = await readInput(Input.REAL);
  await readAndParse(rl);
  
  let loopIndex = -1;
  
  bundledData.reverse();
  
  while (winningNumber == -1) {
    loopIndex++;
    
    const transformedResult = reverseLookup(loopIndex);
    console.log('loopIndex', loopIndex);
    console.log('transformedResult', transformedResult);
    
    if (validateSeed(transformedResult)) {
      winningNumber = loopIndex;
      
      break;
    }
  }
  
  console.log('winningNumber', winningNumber);
}

function reverseLookup(loopIndex: number): number {
  let result = loopIndex;
  
  for (const bundledDataElement of bundledData) {
    result = reverseTransform(result, bundledDataElement);
  }
  
  return result;
}

function reverseTransform(previousResult: number, transform: SourceToDestination[]): number {
  const entryResult = transform.find(
    (entry) =>
      previousResult >= entry.source &&
      previousResult < entry.source + entry.range);
  
   
  if (entryResult == undefined) {
    return previousResult;
  }

  return entryResult.destination - entryResult.source + previousResult;
}

function validateSeed(transformedResult: number): boolean {
  const result = seedData.find(value => {

    return value.seedNumber <= transformedResult &&
      value.seedNumber + value.range > transformedResult
  })
  
  return result != undefined;
}

async function readAndParse(rl: any): Promise<void> {
  for await (const line of rl) {
    parseInput(line);
  }
}

function parseInput(line: string): void {
  const rawAlmanacData = line.split(':').pop()?.trim()!;
  const rawAgroData = rawAlmanacData.split(' ').map(Number);
  const isNewCategory = line.includes(' map:');
  
  if (isNewCategory) {
    categoryIndex++;
    
    return;
  }
  
  if (isEmpty(rawAgroData)) return;
  
  if (seedData.length === 0) {
    
    for (let i = 0; i < rawAgroData.length; i += 2) {
      const seedObj: Seeds = {
        seedNumber: rawAgroData[i],
        range: rawAgroData[i + 1]
      }
      
      seedData.push(seedObj);
    }
    
    return;
  }
  
  bundledData[categoryIndex].push({
    destination: rawAgroData[1],
    source: rawAgroData[0],
    range: rawAgroData[2],
  })
}

function isEmpty(rawAgroData: number[]): boolean {
  return rawAgroData[0] === 0 && rawAgroData.length === 1;
}
