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

const SeedToSoil = new Map<number, number>;
const SoilToFertilizer = new Map<number, number>;
const FertilizerToWater = new Map<number, number>;
const WaterToLight = new Map<number, number>;
const LightToTemperature = new Map<number, number>;
const TemperatureToHumidity = new Map<number, number>;
const HumidityToLocation = new Map<number, number>;

const bundledMaps = [
  SeedToSoil,
  SoilToFertilizer,
  FertilizerToWater,
  WaterToLight,
  LightToTemperature,
  TemperatureToHumidity,
  HumidityToLocation
]

export async function partTwoUnefficientSolution() {
  const rl = await readInput(Input.TEST);
  await readAndParse(rl);
  
  const results = [];
  
  for (let seedDataIndex = 0; seedDataIndex < seedData.length; seedDataIndex++) {
    for (
      let seedNumber = seedData[seedDataIndex].seedNumber;
         seedNumber < seedData[seedDataIndex].seedNumber + seedData[seedDataIndex].range;
         seedNumber++) {
      
      const result = lookUp(seedNumber);
      results.push(result);
    }
  }
  
  const lowestValue = calculateLowestValue(results);
  
  console.log(lowestValue);
}

function lookUp(seedNumber: number) {
  const destinationObj = {
    current: seedNumber,
    previous: seedNumber,
    index: 0
  }
  
  for (let bundleIndex = 0; bundleIndex < bundledMaps.length; bundleIndex++) {
    mapData(destinationObj.current, bundleIndex);
    
    const newDestination = bundledMaps[bundleIndex].get(destinationObj.current);
    
    if (newDestination) {
      destinationObj.previous = destinationObj.current;
      destinationObj.current = newDestination;
    }
    
    bundledMaps[bundleIndex].clear();
    
    destinationObj.index++;
  }
  
  return destinationObj.current;
}

function fromTo(sourceToDestinationData: SourceToDestination, bundleIndex: number, destinationNumber: number) {
  if (sourceToDestinationData.source <= destinationNumber && sourceToDestinationData.source + sourceToDestinationData.range >= destinationNumber) {
    for (let index = 0; index < sourceToDestinationData.range; index++) {
      
      if (sourceToDestinationData.source + index != destinationNumber) {
        continue;
      }
      
      bundledMaps[bundleIndex].set(sourceToDestinationData.source + index, sourceToDestinationData.destination + index);
      console.log(bundledMaps[bundleIndex]);
      
      break;
    }
  }
}

function mapData(destinationNumber: number, bundleIndex: number): void {
  for (let dataIndex = 0; dataIndex < bundledData[bundleIndex].length; dataIndex++) {
    fromTo(bundledData[bundleIndex][dataIndex], bundleIndex, destinationNumber);
  }
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
    destination: rawAgroData[0],
    source: rawAgroData[1],
    range: rawAgroData[2],
  })
}

function isEmpty(rawAgroData: number[]): boolean {
  return rawAgroData[0] === 0 && rawAgroData.length === 1;
}

function calculateLowestValue(results: number[]): number {
  return results.reduce((previousValue, currentValue) =>
    currentValue < previousValue ? currentValue : previousValue)
}