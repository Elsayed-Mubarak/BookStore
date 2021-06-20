let inquirer = require('inquirer')
let BookController = require('./controllers/book-controller')
let BookService = require('./services/book-service')

let bc = new BookController(new BookService())
global.bc = bc
global.inquirer = inquirer
const { showMenu } = require('./core/view-menu')

showMenu()

module.exports = { showMenu }