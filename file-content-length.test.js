import { countFileContentLines, ENCODING } from "./file-content-length";
import { promisify } from "util";
import { existsSync, mkdir, rm, writeFile } from "fs";

const TEST_FILE_DIR = "./test-files";

beforeAll(async () => {
  if (!existsSync(TEST_FILE_DIR)) {
    await promisify(mkdir)(TEST_FILE_DIR);
  }
});

afterAll(async () => {
  await promisify(rm)(TEST_FILE_DIR, { recursive: true });
});

describe("Count file content lines", () => {
  it("counts 0 lines when file is empty", async () => {
    const filepath = `${TEST_FILE_DIR}/empty.txt`;
    await promisify(writeFile)(filepath, "", ENCODING);
    const count = await countFileContentLines(filepath);
    expect(count).toBe(0);
  });

  it("counts 1 line when the file has only one line", async () => {
    const filepath = `${TEST_FILE_DIR}/single-line.txt`;
    await promisify(writeFile)(filepath, "a", ENCODING);
    const count = await countFileContentLines(filepath);
    expect(count).toBe(1);
  });

  it("counts lines when the file has many lines", async () => {
    const filepath = `${TEST_FILE_DIR}/many-line.txt`;
    await promisify(writeFile)(filepath, "a\nb\nc", ENCODING);
    const count = await countFileContentLines(filepath);
    expect(count).toBe(3);
  });

  it("counts 0 when file includes only empty lines", async () => {
    const filepath = `${TEST_FILE_DIR}/only-empty-line.txt`;
    await promisify(writeFile)(filepath, "\n\n\n", ENCODING);
    const count = await countFileContentLines(filepath);
    expect(count).toBe(0);
  });

  it("ignores all empty lines", async () => {
    const filepath = `${TEST_FILE_DIR}/empty-line.txt`;
    await promisify(writeFile)(filepath, "a\nb\n\nc", ENCODING);
    const count = await countFileContentLines(filepath);
    expect(count).toBe(3);
  });

  it("throws error when file does not exist", async () => {
    const filepath = `${TEST_FILE_DIR}/not-exist.txt`;
    expect(async () => await countFileContentLines(filepath)).rejects.toThrow(
      /no such file/i
    );
  });
});
