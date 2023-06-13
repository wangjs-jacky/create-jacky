const BasicGenerator = require('../../dist/BasicGenerator.js');
const ora = require("ora");

class Generator extends BasicGenerator {
  /* 指定列表 */
  async prompting() {
    const spinner = ora('查询仓库中')
    const getPrompts = () => new Promise((resolve) => {
      spinner.start();

      setTimeout(() => {
        resolve([
          {
            name: 'name',
            message: `What's the plugin name?`,
            default: this.name,
          },
          {
            name: 'description',
            message: `What's your plugin used for?`,
          },
          {
            name: 'mail',
            message: `What's your email?`,
          },
          {
            name: 'author',
            message: `What's your name?`,
          },
          {
            name: 'org',
            message: `Which organization is your plugin stored under github?`,
          },
          {
            name: 'isTypeScript',
            type: 'list',
            message: 'Select the development language',
            choices: [
              {
                name: 'TypeScript',
                value: true,
              },
              {
                name: 'JavaScript',
                value: false,
              },
            ],
            default: true,
          },
          {
            name: 'withUmiUI',
            type: 'confirm',
            message: 'Does your plugin have ui interaction(umi ui)?',
            default: false,
          },
        ])
      }, 3000)
    });

    const prompts = await getPrompts();
    spinner.stop();

    return this.prompt(prompts).then(props => {
      this.prompts = props;
    });
  }

  writing() {
    this.writeFiles({
      /* 传入列表 */
      context: this.prompts
    });
  }
}

module.exports = Generator;