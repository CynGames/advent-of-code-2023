import path from "path";
import fs from "fs";
import readline from "readline";
import {promisify} from 'util';

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

const alternativeReadFile = promisify(fs.readFile);

export async function alternativeReadInput(typeOfInput: Input): Promise<string> {
  const pathToFile = path.join(__dirname, `../data/${typeOfInput}.txt`);
  
  return await alternativeReadFile(pathToFile, 'utf8');
}
