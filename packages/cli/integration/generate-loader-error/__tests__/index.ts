import { runCLI } from "@kosko/test-utils";
import execa from "execa";
import { dirname } from "path";

const testDir = dirname(__dirname);

let result: execa.ExecaReturnValue;

beforeEach(async () => {
  result = await runCLI(["generate"], {
    cwd: testDir,
    reject: false,
    env: {
      // Disable ExperimentalWarning
      NODE_NO_WARNINGS: "1"
    }
  });
});

test("should return status code 1", () => {
  expect(result.exitCode).toEqual(1);
});

test("should print the error", () => {
  expect(result.stderr).toMatchSnapshot();
});
