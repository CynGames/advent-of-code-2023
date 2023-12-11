import {Input, readInput} from "./helper/helper";

type ScratchCardRaw = {
  gameIdRaw: string,
  winningNumbersRaw: string,
  ownedNumbersRaw: string
}

type ScratchCard = {
  gameId: number,
  winningNumbers: number[],
  ownedNumbers: number[]
}

let AGGREGATED_VALUE = 0;

export async function partOne() {
  const rl = await readInput(Input.TEST);
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  console.log(AGGREGATED_VALUE)
}

function parseInput(line: string): void {
  const rawData = splitInputData(line);
  const scratchCard = parseDataIntoObject(rawData);
  const cardPoints = findNumberMatches(scratchCard);
  
  AGGREGATED_VALUE += cardPoints;
}

function findNumberMatches(scratchCard: ScratchCard): number {
  const winningArray = scratchCard.winningNumbers;
  const ownedArray = scratchCard.ownedNumbers;
  
  let points = 0;
  
  for (const ownedNumber of ownedArray) {
    for (const winningNumber of winningArray) {
      if (ownedNumber === winningNumber) {
        
        if (points <= 1) points++;
        else points *= 2;
      }
    }
  }
  
  return points;
}

function parseDataIntoObject(rawData: ScratchCardRaw): ScratchCard {
  const gameId = parseGameId(rawData.gameIdRaw);
  const winningNumbers = parseNumbers(rawData.winningNumbersRaw);
  const ownedNumbers = parseNumbers(rawData.ownedNumbersRaw);
  
  return {
    gameId: gameId,
    ownedNumbers: winningNumbers,
    winningNumbers: ownedNumbers
  }
}


function parseNumbers(numbersRaw: string): number[] {
  return numbersRaw
    .split(' ')
    .filter( value => value !== '')
    .map(Number);
}

function parseGameId(gameIdRaw: string): number {
  return +gameIdRaw?.match(/\d+/)!.shift()!;
}

function splitInputData(line: string): ScratchCardRaw {
  const gameCardNumbersSplit = line.split('|').map((r) => r.trim());
  const gameCardIdSplit = gameCardNumbersSplit[0].split(':').map((r) => r.trim());
  
  const gameCardIdRaw = gameCardIdSplit[0];
  const gameCardWinningNumbersRaw = gameCardIdSplit[1];
  const gameCardOwnedNumbers = gameCardNumbersSplit[1];
  
  return {
    gameIdRaw: gameCardIdRaw,
    winningNumbersRaw: gameCardWinningNumbersRaw,
    ownedNumbersRaw: gameCardOwnedNumbers
  }
}