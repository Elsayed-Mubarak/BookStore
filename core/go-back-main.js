const { showMenu } = require('../index')
backToMainMenu = async function () {
  inquirer
    .prompt([
      {
        name: 'back',
        type: 'input',
        message: 'back to main menu?',
        choices: ['yes', 'no'],
      },
    ])
    .then(async (answers) => {
      if (answers.back === 'yes') {
        return showMenu()
      } else {
        await bc.OnApllicationExit()
      }
    })
}
module.exports = { backToMainMenu }
