import {Input, readInput} from "./helper/helper";

type ScratchCardRaw = {
  gameIdRaw: string,
  winningNumbersRaw: string,
  ownedNumbersRaw: string
}

type ScratchCard = {
  gameId: number,
  amount: number,
  winningNumbers: number[],
  ownedNumbers: number[]
}

let FINAL_RESULT = 0;
const scratchCards = new Array<ScratchCard>;

export async function partTwo() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    parseInput(line);
  }
  
  for (const scratchCard of scratchCards) {
    const cardPoints = findNumberMatches(scratchCard);
    
    addDuplicates(cardPoints, scratchCard.gameId, scratchCard.amount);
  }
  
  calculateFinalResult();
  
  console.log(FINAL_RESULT);
}

function calculateFinalResult(): void {
  for (const scratchCard of scratchCards) {
    FINAL_RESULT += scratchCard.amount;
  }
}

function addDuplicates(points: number, id: number, amount: number): void {
  for (let i = id; i < points + id; i++) {
    if (scratchCards[i] === undefined || points === 0) continue;
    
    scratchCards[i].amount += amount;
  }
}

function parseInput(line: string): void {
  const rawData = splitInputData(line);
  const scratchCard = parseDataIntoObject(rawData);
  
  scratchCards.push(scratchCard);
}

function findNumberMatches(scratchCard: ScratchCard): number {
  const winningArray = scratchCard.winningNumbers;
  const ownedArray = scratchCard.ownedNumbers;
  
  let points = 0;
  
  for (const ownedNumber of ownedArray) {
    for (const winningNumber of winningArray) {
      if (ownedNumber === winningNumber) {
        points++;
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
    amount: 1,
    ownedNumbers: winningNumbers,
    winningNumbers: ownedNumbers
  }
}

function parseNumbers(numbersRaw: string): number[] {
  return numbersRaw
    .split(' ')
    .filter(value => value !== '')
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

