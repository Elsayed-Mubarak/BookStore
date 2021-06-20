const { backToMainMenu } = require('./go-back-main')

getBookById = async function () {
  inquirer
    .prompt([
      {
        name: 'getBookById',
        type: 'input',
        message: 'enter book ID',
      },
    ])
    .then(async (answers) => {
      if (!answers.getBookById) return backToMainMenu()
      let book = await bc.getSpecificBook(parseInt(answers.getBookById))
      if (!book) return backToMainMenu()
      console.log(
        ` ID: ${book.id}\n Title: ${book.title}\n Author: ${book.author}\n Description: ${book.description}`,
      )
      backToMainMenu()
    })
}
module.exports = { getBookById }
