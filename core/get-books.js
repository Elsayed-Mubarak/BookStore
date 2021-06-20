/**
 * get all books
 */
getbooks = async function () {
  // console.log(' ..........global.................', bc)
  let books = await bc.getBooks()
  for (let book of books) {
    //console.log(' books .....', books)
    console.log(`[${book.id}] ${book.title}\n`)
  }
}
module.exports = { getbooks }