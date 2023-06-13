import { statSync } from "fs";
import * as Generator from "yeoman-generator";
import * as glob from "glob";

/* 抽离公共逻辑 */
module.exports = class extends Generator {
  [x: string]: any;
  writeFiles({ context, filterFiles = Boolean }) {
    glob
      .sync("**/*", {
        /* 当前工程下的 templates 文件夹 */
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .forEach((file) => {
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          /* 内置的是：mem-fs-editor */
          /* 使用 ejs 模板语法：https://ejs.co/#install */
          /* 具体案例可见源码：https://github.com/yeoman/generator/blob/main/src/actions/fs.ts#L213-L220 */
          this.fs.copyTpl(
            /* 待拷贝的文件 */
            this.templatePath(filePath),
            /* file 是文件名，将 _aaa.txt 转译为 .aaa.txt */
            this.destinationPath(file.replace(/^_/, ".")),
            context,
          );
        }
      });
  }
};
