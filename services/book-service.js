const fs = require('fs')

class BookService {
  constructor() {
    this.data = []
    this.isDataLoaded = false
  }
  /**
   * @desc :generate id for new added books based on last id in file
   * @returns : lastBookId
   */
  async getId() {
    let lastBook = this.data[this.data.length - 1]
    if (!lastBook) return 1
    return lastBook.id + 1
  }
  /**
   * @param {*} id
   * @param {*} newBook
   */
  async updateBook(id, newBook) {
    for (let obj of this.data) {
      if (obj.id == id) {
        Object.assign(obj, newBook)
      }
    }
  }
  /**
   * @param {*} obj
   * @desc : add book to the loaded data
   */
  async saveBook(obj) {
    this.data.push(obj)
  }
  /**
   * method run on exit of application to persist books to disk
   */
  async saveData() {
    fs.writeFile('/utils/books.json', JSON.stringify(this.data), (err) => {
    })
  }
  /**
   * method run on application start to store all books in array of objects
   */
  async loadData() {
    if (!this.isDataLoaded) {
        this.data = require('../utils/books.json')
        //console.log(' ............data loaded..............',this.data);
        this.isDataLoaded = true
    }
}


/*  async loadData() {
    console.log(' load data ...')
    if (!this.isDataLoaded) {
      fs.readFile('./utils/books.json', (err, book) => {
        if (err) {
          console.log(' error on read file ...', err)
        }
        let books = JSON.parse(book)
        this.data = books
        // console.log(' Data On Arry.........', this.data)
        this.isDataLoaded = true
      })
    }
  }*/

  /**
   * return list of books id,title
   */
  async viewBooks() {
    let newBooks = this.data.map((book) => {
      return {
        id: book.id,
        title: book.title,
      }
    })
    if (!newBooks) throw new Error('books not found')
    return newBooks
  }
  /**
   * get specific book object by id from file
   */
  async viewSpecificBook(id) {
    for (let book of this.data) {
      if (book.id === id) {
        return book
      }
    }
    throw Error('book not found')
  }
  /**
   * @desc : generic find method to search for keyword in whole objects
   * @param {*} keyword
   * @returns arr[]
   */
  async find(keyword) {
    let arr = []
    for (let obj of this.data) {
      if (obj.title.includes(keyword)) {
        arr.push(obj)
      } else if (obj.author.includes(keyword)) {
        arr.push(obj)
      } else if (obj.description.includes(keyword)) {
        arr.push(obj)
      }
    }
    if (!arr.length) throw new Error('no search result')
    return arr
  }
}
module.exports = BookService
