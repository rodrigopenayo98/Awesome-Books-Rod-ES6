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

function saveToLocalStorage() {
  localStorage.setItem('bookList', JSON.stringify(list));
}

let htmlList = '';

function renderBooks() {
  htmlList = '';

  list.forEach((book) => {
    htmlList += `
    <div>
      <p>
        <span class="title">${book.title}</span>
        <br>
        ${book.author}
        <br>
        <button class="remove">Remove</button>
      </p>
      <hr>
    </div>`;
  });

  bookList.innerHTML = htmlList;

  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach((button) => {
    // eslint-disable-next-line
    button.addEventListener('click', removeBook);
  });
}

function removeBook(event) {
  const button = event.target;
  const bookContainer = button.parentNode.parentNode;
  const bookTitle = bookContainer.querySelector('.title').textContent;

  const updatedList = list.filter((book) => book.title !== bookTitle);

  list = updatedList;

  renderBooks();
  saveToLocalStorage();
}

function addBook() {
  const newTitle = title.value.trim();
  const newAuthor = author.value.trim();

  if (newTitle !== '' && newAuthor !== '') {
    const newBook = {
      title: newTitle,
      author: newAuthor,
    };

    list.push(newBook);

    renderBooks();
    saveToLocalStorage();

    title.value = '';
    author.value = '';
  }
}

renderBooks();

add.addEventListener('click', addBook);
