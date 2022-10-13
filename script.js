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

Book.prototype.toggleReadStatus = function() {
  this.readStatus === 'read' ? this.readStatus = 'not read' : this.readStatus = 'read';

  const card = document.getElementById(`${this.title}`);
  card.childNodes[3].innerText = `Read status: ${this.readStatus}`;
}

//dummy books
let book0 = new Book('The-Principles-of-Object-Oriented-JavaScript', 'Nicholas C. Zakas', 122, 'read');
let book1 = new Book('Introduction to Networking', 'Dr. Chuck', 172, 'read');
let book2 = new Book('Clean Code', 'Robert C. Martin', 462, 'not read');

//myLibrary array as storage for the book objects
let myLibrary = [book0, book1, book2];

//load dummy book 
window.onload = publishCards(myLibrary);

function addBookToLibrary(library, book) {
  if (!book) { //to prevent undefined "books" from being pushed into the array  
    return;
  };

  library.push(book); 
  toggleInputForm();
  blur();
}

function deleteBookFromLibrary(library, bookTitle) {
  //get index of book
  let indexBook; 
  library.forEach((book, index) => {
    if (book.title === bookTitle) {
    indexBook = index; 
    };
  });
  //splice book out
  library.splice(indexBook, 1); 
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
  
  return new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
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

  const cardDeleteButton = document.createElement('button');
  cardDeleteButton.textContent = 'Delete Card';
  cardDeleteButton.classList.add('card-deleteButton');
  cardDeleteButton.addEventListener('click', (e) => {
    deleteBookFromLibrary(myLibrary, e.target.parentElement.id);
    deleteCard(e.target.parentElement.id); 
  });

  const toggleStatusButton = document.createElement('button');
  toggleStatusButton.textContent = 'Toggle Read Status';
  toggleStatusButton.classList.add('card-toggleReadStatusButton');
  toggleStatusButton.addEventListener('click', (e) => {
    //get index of book
    let indexBook; 
    library.forEach((book, index) => {
      if (book.title === e.target.parentElement.id) {
      indexBook = index; 
      };
    });
    myLibrary[indexBook].toggleReadStatus();
  });

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardReadStatus);
  card.appendChild(cardDeleteButton); 
  card.appendChild(toggleStatusButton);

  container.appendChild(card); 
  });
}

function deleteCard(bookTitle) {
  document.getElementById(bookTitle).remove();
}


//button to add new books to the library and publish the cards on the page
let button = document.querySelector('.submitButton');
button.addEventListener('click', () => {
  addBookToLibrary(myLibrary, createNewBook()); 
  publishCards(myLibrary);
}); 


//change the visibility of the fieldset 
const toggleButton = document.querySelector('.newBookButton'); 
toggleButton.addEventListener('click', () => {
  toggleInputForm();
  blur();
});

function toggleInputForm() {
  const fieldset = document.querySelector('fieldset');
  fieldset.hidden = fieldset.hidden ? false : true; 
}

function blur() {
  const container = document.getElementsByClassName('cardContainer')[0];
  container.classList.toggle('blur');
}