function Book(title, author, pages, readStatus) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.readStatus = readStatus 
}

Book.prototype.info =  function() {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.readStatus}`;
};

let book = new Book("Book1", "Bob", 35, "not read yet");

console.log(book.info());
console.log(Book.prototype);