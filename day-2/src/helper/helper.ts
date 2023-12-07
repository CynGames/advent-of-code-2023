import path from "path";
import fs from "fs";
import readline from "readline";

export async function readInput() {
  const pathToFile = path.join(__dirname, `../data/input.txt`);
  const fileStream = fs.createReadStream(pathToFile);
  
  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
}