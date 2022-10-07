let book = new Book("Book1", "Bob", 35, "read");
let book2 = new Book("Book2", "Bob2", 356, "not read yet");
let book3 = new Book("Book3", "Bob3", 355, "not read yet");
let book4 = new Book("Book4", "Bob4", 345, "read");

let myLibrary = [book];

function Book(title, author, pages, readStatus) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.readStatus = readStatus 
}

Book.prototype.info =  function() {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.readStatus}`;
};


function addBookToLibrary(library, book) {
  if (!book) {
    return;
  };

  library.push(book); 
}


function createNewBook() {
  let bookTitle = document.getElementById('title').value;
  let bookAuthor = document.getElementById('author').value;
  let bookPages = document.getElementById('pages').value;
  let bookReadStatus = document.getElementsByName('readStatus')[0].checked ? document.getElementsByName('readStatus')[0].value : document.getElementsByName('readStatus')[1].value;
  let form = document.getElementById('form');
  
  if (!form.checkValidity()) { 
    return; 
  };

  form.reset();
  
  return new Book(bookTitle, bookAuthor, bookPages, bookReadStatus)
}


let button = document.getElementsByTagName('button')[0];
button.addEventListener('click', () => {
  addBookToLibrary(myLibrary, createNewBook()); 
}); 


function addCards(library) {
  library.forEach(book => {
 
  const container = document.querySelector('.cardContainer'); 

  if (container.children.namedItem(book.title)) {
    return; 
  };

  const card = document.createElement('div');
  card.classList.add('card');
  card.id = book.title;

  const cardTitle = document.createElement('div');
  cardTitle.textContent = `Title: ${book.title}`;
  
  const cardAuthor = document.createElement('div');
  cardAuthor.textContent = `Author: ${book.author}`;
  
  const cardPages = document.createElement('div');
  cardPages.textContent = `Pages: ${book.pages}`;
  
  const cardReadStatus = document.createElement('div');
  cardReadStatus.textContent = `Read status: ${book.readStatus}`;

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardReadStatus);

  container.appendChild(card); 
  });
}
