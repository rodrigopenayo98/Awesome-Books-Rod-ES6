class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.list = JSON.parse(localStorage.getItem('bookList')) || [];
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.addButton = document.querySelector('#add');
    this.bookListContainer = document.querySelector('#book-list');
    this.addButton.addEventListener('click', this.addBook.bind(this));
    this.renderBooks();
  }

  saveToLocalStorage() {
    localStorage.setItem('bookList', JSON.stringify(this.list));
  }

  removeBook(event) {
    const button = event.target;
    const bookContainer = button.parentNode.parentNode;
    const { bookId } = bookContainer.dataset;
    this.list = this.list.filter((book) => book.id !== bookId);
    this.bookListContainer.removeChild(bookContainer);
    this.saveToLocalStorage();
  }

  renderBooks() {
    this.bookListContainer.innerHTML = '';

    this.list.forEach((book) => {
      const bookContainer = document.createElement('div');
      bookContainer.classList.add('sectionBook');
      bookContainer.dataset.bookId = book.id;
      bookContainer.className = 'bookContainer';

      const bookInfo = document.createElement('div');
      bookInfo.className = 'bookInfo';

      const textContainer = document.createElement('div'); // Elemento contenedor para los dos h4
      textContainer.className = 'textBook';

      const titleElement = document.createElement('h4');
      titleElement.className = 'titleBook';
      titleElement.textContent = `"${book.title}" by`; // Agregar el texto " by "

      const authorElement = document.createElement('h4');
      authorElement.className = 'authorName';
      authorElement.textContent = book.author;

      const removeButton = document.createElement('button');
      removeButton.className = 'remove';
      removeButton.textContent = 'Remove';

      textContainer.appendChild(titleElement);
      textContainer.appendChild(authorElement);

      bookInfo.appendChild(textContainer);
      bookInfo.appendChild(removeButton);

      bookContainer.appendChild(bookInfo);
      this.bookListContainer.appendChild(bookContainer);
    });

    const removeButtons = this.bookListContainer.querySelectorAll('.remove');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => this.removeBook(event));
    });
  }

  addBook() {
    const newTitle = this.titleInput.value.trim();
    const newAuthor = this.authorInput.value.trim();

    if (newTitle !== '' && newAuthor !== '') {
      const newBook = new Book(newTitle, newAuthor);
      newBook.id = Date.now().toString();
      this.list.push(newBook);

      this.renderBooks();
      this.saveToLocalStorage();

      this.titleInput.value = '';
      this.authorInput.value = '';
    }
  }
}

function initializeBookList() {
  const bookList = new BookList();
  return bookList;
}

initializeBookList();
