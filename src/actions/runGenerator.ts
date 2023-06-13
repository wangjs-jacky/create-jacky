const fse = require("fs-extra");
const path = require("path");
const yeoman = require("yeoman-environment");
const preferredPm = require("preferred-pm");
const clipboardy = require("clipboardy");

interface RunGeneratorType {
  generatorPath: string;
  config: {
    name: string;
    cwd: string;
    args: any;
  };
}

async function detectPackageManager(nodePackageManager, cwd) {
  if (nodePackageManager) {
    return nodePackageManager;
  }
  const pm = await preferredPm(cwd);
  return pm && pm.name;
}

export const runGenerator = async (generatorPath, config) => {
  let {
    folderName = "",
    cwd = process.cwd(),
    skipInstall = true,
    nodePackageManager: pm,
    ...restConfig
  } = config;

  /* 获取内置的 npm 包管理工具 */
  const nodePackageManager = await detectPackageManager(pm, cwd);

  return new Promise((resolve) => {
    if (folderName) {
      fse.ensureDirSync(folderName);
      cwd = path.join(cwd, folderName);
    }
    const Generator = require(generatorPath);
    const env = yeoman.createEnv([], {
      /* 当前工作文件夹 */
      cwd,
      /* 跳过自动安装 */
      skipInstall,
      nodePackageManager,
      ...restConfig,
    });

    /* 导入 generators 文件夹下的内容 */
    const generator = new Generator({
      name: folderName,
      env,
      resolved: require.resolve(generatorPath),
    });

    return generator.run().then(() => {
      if (folderName) {
        if (process.platform !== `linux` || process.env.DISPLAY) {
          clipboardy.writeSync(`cd ${folderName}`);
          console.log("\n📋 已拷贝到剪贴板, 直接使用 Ctrl+V ");
        }
      }
      console.log("\n✨ 文件生成完成");
      resolve(true);
    });
  });
};
