//Book object
function Book(title, author, pages, readStatus) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.readStatus = readStatus 
}

Book.prototype.info =  function() {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.readStatus}`;
};


//myLibrary array as storage for the book objects
let myLibrary = [];

function addBookToLibrary(library, book) {
  if (!book) { //to prevent undefined "books" from being pushed into the array  
    return;
  };

  library.push(book); 
}


//create new book objects based on the form input 
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


//publish items of the library on the page
function publishCards(library) {
  library.forEach(book => {
 
  const container = document.querySelector('.cardContainer'); 

  if (container.children.namedItem(book.title)) { //prevent duplicate published cards
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


//button to add new books to the library and publish the cards on the page
let button = document.querySelector('.submitButton');
button.addEventListener('click', () => {
  addBookToLibrary(myLibrary, createNewBook()); 
  publishCards(myLibrary);
}); 


//change the visibility of the fieldset 
const toggleButton = document.querySelector('.newBookButton'); 
toggleButton.addEventListener('click', toggleInputForm);

function toggleInputForm() {
  const fieldset = document.querySelector('fieldset');
  fieldset.hidden = fieldset.hidden ? false : true; 
}