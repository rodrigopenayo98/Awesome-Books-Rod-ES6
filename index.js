let title = document.querySelector("#title");
let author = document.querySelector("#author");
let add = document.querySelector("#add");
let bookList = document.querySelector("#book-list");


let list = JSON.parse(localStorage.getItem("bookList")) || [
  {
    titleBook: "Martin Fierro",
    authorBook: "José Hernandez",
  },
  {
    titleBook: "Harry Potter and the Chamber of Secrets",
    authorBook: "J. K. Rowling",
  },
];

let htmlList = "";

function addBook() {
  const newBook = {
    titleBook: title.value,
    authorBook: author.value,
  };

  list.push(newBook);

  renderBooks();
  saveToLocalStorage();
}

function removeBook(event) {
  const button = event.target;
  const bookContainer = button.parentNode;
  const bookTitle = bookContainer.querySelector(".title").textContent;

  const updatedList = list.filter((book) => book.titleBook !== bookTitle);

  list = updatedList;

  renderBooks();
  saveToLocalStorage();
}

function renderBooks() {
  htmlList = "";

  list.forEach((book) => {
    htmlList += `
    <div>
      <p>
        <span class="title">${book.titleBook}</span>
        <br>
        ${book.authorBook}
        <br>
        <button class="remove">Remove</button>
      </p>
      <hr>
    </div>`;
  });

  bookList.innerHTML = htmlList;

  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeBook);
  });
}

function saveToLocalStorage() {

localStorage.setItem("booklist", JSON.stringify(list));

}

renderBooks();

add.addEventListener("click", addBook);

