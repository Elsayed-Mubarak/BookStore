let { getbooks } = require('./get-books')
let { getBookById } = require('./get-bookById')
let { backToMainMenu } = require('./go-back-main')
showMenu = async () => {
  await bc.OnApllicationStart()
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: '======= Book Manager =======',
        choices: [
          'view all books',
          'add a book',
          'edit a book',
          'search for a book',
          'save and exit',
        ],
      },
    ])
    .then(async (answers) => {
      if (answers.menu == 'view all books') {
        await getbooks()
        await getBookById()
      } else if (answers.menu == 'search for a book') {
        inquirer
          .prompt([
            {
              name: 'search',
              type: 'input',
              message: 'enter keyword',
            },
          ])
          .then(async (answers) => {
            let books = await bc.search(answers.search)
            if (!books) return backToMainMenu()
            for (let book of books) {
              console.log(`[${book.id}] ${book.title}\n`)
            }
            await getBookById()
          })
      } else if (answers.menu == 'add a book') {
        inquirer
          .prompt([
            {
              name: 'title',
              type: 'input',
              message: 'enter book title',
            },
            {
              name: 'author',
              type: 'input',
              message: 'enter book author name',
            },
            {
              name: 'description',
              type: 'input',
              message: 'enter book description',
            },
          ])
          .then(async (answers) => {
            await bc.createBook(
              answers.title,
              answers.author,
              answers.description,
            )
            console.log('book saved')
            backToMainMenu()
          })
      } else if (answers.menu == 'edit a book') {
        await getbooks()
        inquirer
          .prompt([
            {
              name: 'id',
              type: 'input',
              message: 'enter book ID',
            },
            {
              name: 'title',
              type: 'input',
              message: 'enter book title',
            },
            {
              name: 'author',
              type: 'input',
              message: 'enter book author name',
            },
            {
              name: 'description',
              type: 'input',
              message: 'enter book description',
            },
          ])
          .then(async (answers) => {
            let updatedBook = {}
            if (answers.title) updatedBook['title'] = answers.title
            if (answers.author) updatedBook['author'] = answers.author
            if (answers.description)
              updatedBook['description'] = answers.description
            await bc.updateBook(answers.id, updatedBook)
            console.log('book updated')
            backToMainMenu()
          })
      } else if (answers.menu == 'save and exit') {
        console.log('library saved')
        await bc.OnApllicationExit()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = { showMenu }
