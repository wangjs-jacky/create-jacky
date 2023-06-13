import { cac } from "cac";
import { create } from "./actions/create";
import * as semver from "semver";
import * as chalk from "chalk";

const version = require("../package.json").version;

const cli = cac("island").version(version).help();

/* check env */
if (!semver.satisfies(process.version, ">= 8.0.0")) {
  console.error(
    chalk.red("✘ The generator will only work with Node v8.0.0 and up!"),
  );
  process.exit(1);
}

/* 指令 */
cli
  .command("create [folderName]", "create templatePath", {
    allowUnknownOptions: true,
  })
  .option("--type <type>", "安装目录")
  .action(async (folderName: string, option: any = {}) => {
    const config = { folderName, ...option };
    try {
      create(config);
      console.log("options", config);
    } catch (error) {
      console.error(chalk.red(`> Generate failed`));
      process.exit(1);
    }
  });

cli.parse();
