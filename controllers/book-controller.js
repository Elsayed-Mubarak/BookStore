const { Book } = require('../models/book')
const BookService = require('../services/book-service')

class BookController {
  constructor(service) {
    this.service = service
    this.books = []
  }
  /**
   * load all books when application starts
   * if you tried to provide empty books.json it won't crash
   */
  async OnApllicationStart() {
    try {
      await this.service.loadData()
    } catch (err) {
      console.log('invalid empty array of objects in books.json')
    }
  }
  /**
   * method to save all books when application exits
   */
  async OnApllicationExit() {
    try {
      await this.service.saveData()
    } catch (err) {
      console.log('error in saving file')
    }
  }
  /**
   *
   * @param {*} title
   * @param {*} author
   * @param {*} description
   * @desc: create book method to handle service calls and return responces
   */
  async createBook(title, author, description) {
    try {
      let id = await this.service.getId()
      console.log('after increment id', id)
      let book = new Book(id, title, author, description)
      await this.service.saveBook(book)
    } catch (err) {
      console.log('error in saving book')
    }
  }

  /**
   * @desc : get all books in service and handle responce
   * @returns : books
   */
  async getBooks() {
    try {
      let books = await this.service.viewBooks()
      return books
    } catch (err) {
      console.log(err.message)
    }
  }
  /**
   * @desc : get specific book and handle responce
   * @param {*} id
   * @returns : books
   */
  async getSpecificBook(id) {
    try {
      let book = await this.service.viewSpecificBook(id)
      return book
    } catch (err) {
      console.log(err.message)
    }
  }
  /**
   *@desc : update book if exists
   *@param {*} id
   *@param {*} newBook
   */
  async updateBook(id, newBook) {
    try {
      this.service.updateBook(id, newBook)
    } catch (err) {
      console.log(err.message)
    }
  }
  /**
   * @desc : return all books that contains target keyword
   * @param {*} keyword
   * @returns : book
   */
  async search(keyword) {
    try {
      let book = await this.service.find(keyword)
      return book
    } catch (err) {
      console.log(err.message)
    }
  }
}

module.exports = BookController
