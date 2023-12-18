import path from "path";
import fs from "fs";
import readline from "readline";

export enum Input {
  TEST = 'test_input',
  REAL = 'input'
}

export async function readInput(typeOfInput: Input) {
  const pathToFile = path.join(__dirname, `../data/${typeOfInput}.txt`);
  const fileStream = fs.createReadStream(pathToFile);
  
  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
}