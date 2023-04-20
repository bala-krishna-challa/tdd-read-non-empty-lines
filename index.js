import { countFileContentLines } from "./file-content-length.js";
import path from "path";

async function readFileContentLines() {
  try {
    const filename = process.argv[2];
    const filepath = path.join(process.cwd(), filename);
    const linesCount = await countFileContentLines(filepath);

    console.log("Reesult:", linesCount);
  } catch (error) {
    console.error(error.message);
  }
}

readFileContentLines();
