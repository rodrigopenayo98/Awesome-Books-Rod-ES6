const title = document.querySelector('#title');
const author = document.querySelector('#author');
const add = document.querySelector('#add');
const bookList = document.querySelector('#book-list');

let list = JSON.parse(localStorage.getItem('bookList')) || [
  {
    title: 'Martin Fierro',
    author: 'José Hernandez',
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J. K. Rowling',
  },
];

const saveToLocalStorage = () => {
  localStorage.setItem('bookList', JSON.stringify(list));
};

const removeBook = (event) => {
  const button = event.target;
  const bookContainer = button.parentNode.parentNode;
  const { bookId } = bookContainer.dataset;

  list = list.filter((book) => book.id !== bookId);

  bookList.removeChild(bookContainer);

  saveToLocalStorage();
};

const renderBooks = () => {
  bookList.innerHTML = '';

  list.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.dataset.bookId = book.id;

    const bookInfo = document.createElement('p');
    const titleElement = document.createElement('span');
    titleElement.className = 'title';
    titleElement.textContent = book.title;
    const authorElement = document.createTextNode(book.author);
    const removeButton = document.createElement('button');
    removeButton.className = 'remove';
    removeButton.textContent = 'Remove';

    bookInfo.appendChild(titleElement);
    bookInfo.appendChild(document.createElement('br'));
    bookInfo.appendChild(authorElement);
    bookInfo.appendChild(document.createElement('br'));
    bookInfo.appendChild(removeButton);

    bookContainer.appendChild(bookInfo);
    bookContainer.appendChild(document.createElement('hr'));

    bookList.appendChild(bookContainer);
  });

  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', removeBook);
  });
};

const addBook = () => {
  const newTitle = title.value.trim();
  const newAuthor = author.value.trim();

  if (newTitle !== '' && newAuthor !== '') {
    const newBook = {
      id: Date.now().toString(),
      title: newTitle,
      author: newAuthor,
    };

    list.push(newBook);

    renderBooks();
    saveToLocalStorage();

    title.value = '';
    author.value = '';
  }
};

renderBooks();

add.addEventListener('click', addBook);
