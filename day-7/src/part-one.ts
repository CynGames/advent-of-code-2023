import {Input, readInput} from "./helper/helper";

type MappedHand = { [key: string]: number };

type HandType = {
  type: number,
  hand: HandBid
}

type HandBid = {
  cards: string,
  bid: number,
};

const CardLabels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const HandBidArray = new Array<HandBid>;
const HandTypeArray = new Array<HandType>;
const MappedHandArray = new Array<MappedHand>;

export async function partOne() {
  const rl = await readInput(Input.REAL);
  
  for await (const line of rl) {
    const output = parseInput(line);
    HandBidArray.push(output);
  }
  
  for (const hand of HandBidArray) {
    const output = mapIntoRepeatedLabel(hand);
    MappedHandArray.push(output);
  }
  
  for (let index = 0; index < MappedHandArray.length; index++) {
    const output = getHandRank(MappedHandArray[index], index);
    HandTypeArray.push(output);
  }
  
  const sortedArray = sortHandTypeArray(HandTypeArray);
  const totalWinnings = calculateWinnings(sortedArray);
  console.log('Part 1 Winnings:', totalWinnings);
}

function calculateWinnings(sortedArray: HandType[]): number {
  let result = 0;
  
  for (let index = 0; index < sortedArray.length; index++) {
    result += sortedArray[index].hand.bid * (index + 1);
  }
  
  return result
}

function sortHandTypeArray(handTypeArray: HandType[]) {
  handTypeArray.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.hand.cards.length; i++) {
        if (CardLabels.indexOf(a.hand.cards[i]) < CardLabels.indexOf(b.hand.cards[i])) {
          return 1;
        }
        
        if (CardLabels.indexOf(a.hand.cards[i]) > CardLabels.indexOf(b.hand.cards[i])) {
          return -1;
        }
      }
      
      return 0;
    }
    
    return a.type - b.type;
  });
  
  return handTypeArray;
}

function parseInput(line: string): HandBid {
  const cards = line.split(' ').shift()!;
  const bid = parseInt(line.split(' ').pop()!);
  
  return {
    cards,
    bid
  };
}

function mapIntoRepeatedLabel(hand: HandBid): MappedHand {
  let result: MappedHand = {};
  
  for (let i = 0; i < hand.cards.length; i++) {
    const char = hand.cards[i];
    
    if (char in result) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  }
  
  return result;
}

function getHandRank(mappedHand: MappedHand, index: number): HandType {
  let type: string | number = '0';
  let handOfPreviousIteration = {};
  
  for (const handKey in mappedHand) {
    let handValue = mappedHand[handKey];
    if (handValue <= 1) continue;
    
    if (handOfPreviousIteration == mappedHand)
    {
      if (+handValue > +type)
        type = handValue + type;
      else
        type = type + handValue;
    } else {
      type = handValue.toString();
    }
    
    handOfPreviousIteration = mappedHand;
  }
  
  type = parseInt(type);
  if (type < 10) type *= 10;
  
  const hand = HandBidArray[index];
  
  return {
    type,
    hand
  };
}