import {Input, readInput} from "./helper/helper";

type Coords = {
  x: number,
  y: number
}

export async function partOne() {
  const data = await readInput(Input.REAL).then(value => value.split('\n'));
  const map = data.map(row => row.split(""));
  const startingPosition = getSLocation(data)!;
  
  runThrough(startingPosition, map);
}

function getSLocation(lines: string[]): Coords {
  for (let y = 0; y < lines.length; y++) {
    const x = lines[y].indexOf('S');
    
    if (x >= 0) {
      return { x, y } as Coords;
    }
  }
  
  return { x: -1, y: -1 };
}

function runThrough(start: Coords, map: string[][]) {
  let previousPos = {...start};
  let currentPos = {...start};
  
  currentPos.y++;
  
  let steps = 1;

  while (!(currentPos.x === start.x && currentPos.y === start.y)) {
    switch (map[currentPos.y][currentPos.x]) {
      case "|":
        if (JSON.stringify(test(previousPos, executeMove.down)) === JSON.stringify(currentPos)) {
          executeMove.down(previousPos);
          executeMove.down(currentPos);
        } else {
          executeMove.up(previousPos);
          executeMove.up(currentPos);
        }
        break;
      case "-":
        if (JSON.stringify(test(previousPos, executeMove.right)) === JSON.stringify(currentPos)) {
          executeMove.right(previousPos);
          executeMove.right(currentPos);
        } else {
          executeMove.left(previousPos);
          executeMove.left(currentPos);
        }
        break;
      case "L":
        if (JSON.stringify(test(previousPos, executeMove.down)) === JSON.stringify(currentPos)) {
          executeMove.down(previousPos);
          executeMove.right(currentPos);
        } else {
          executeMove.left(previousPos);
          executeMove.up(currentPos);
        }
        break;
      case "J":
        if (JSON.stringify(test(previousPos, executeMove.down)) === JSON.stringify(currentPos)) {
          executeMove.down(previousPos);
          executeMove.left(currentPos);
        } else {
          executeMove.right(previousPos);
          executeMove.up(currentPos);
        }
        break;
      case "7":
        if (JSON.stringify(test(previousPos, executeMove.right)) === JSON.stringify(currentPos)) {
          executeMove.right(previousPos);
          executeMove.down(currentPos);
        } else {
          executeMove.up(previousPos);
          executeMove.left(currentPos);
        }
        break;
      case "F":
        if (JSON.stringify(test(previousPos, executeMove.left)) === JSON.stringify(currentPos)) {
          executeMove.left(previousPos);
          executeMove.down(currentPos);
        } else {
          executeMove.up(previousPos);
          executeMove.right(currentPos);
        }
        break;
    }
    steps++;
  }
  if (currentPos.x === start.x && currentPos.y === start.y) {
    console.log("the total length of the loop is: ", steps);
    console.log("the farthest point of the loop is: ", steps / 2);
  }
}

function test(position: Coords, moveFunction: { (position: Coords): void; (position: Coords): void; (position: Coords): void; (position: Coords): void; (position: Coords): void; (position: Coords): void; (arg0: { x: number; y: number; }): void; }) {
  const test = {...position};
  moveFunction(test);
  return test;
}

const executeMove = {
  up: function (position: Coords) {
    position.y--;
  },
  down: function (position: Coords) {
    position.y++;
  },
  left: function (position: Coords) {
    position.x--;
  },
  right: function (position: Coords) {
    position.x++;
  },
};