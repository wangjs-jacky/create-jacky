import * as inquirer from "inquirer";
import * as fs from "fs";
import * as path from "path";
/* commjs 包 */
import * as chalk from "chalk";

/* constants */
import { generatorsPath, rootDir } from "../constants";
import { runGenerator } from "./runGenerator";

const generators = fs
  .readdirSync(generatorsPath)
  .filter((f) => !f.startsWith("."))
  .map((f) => {
    return {
      name: `${f.padEnd(15)} - ${chalk.gray(
        require(`${generatorsPath}/${f}/meta.json`).description,
      )}`,
      value: f,
      short: f,
    };
  });

export const create = async (config) => {
  let { type } = config;
  if (!type) {
    /* https://www.npmjs.com/package/inquirer */
    const answers = await inquirer.prompt([
      {
        name: "type",
        message: "选择需要的模板",
        type: "list",
        choices: generators,
      },
    ]);
    type = answers.type;
  }

  const absPath = path.join(rootDir, `./generators/${type}`);

  return runGenerator(absPath, config);
};
