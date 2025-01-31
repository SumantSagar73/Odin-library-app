//store book objects
const myLibrary = [];


//Book constructor function
function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


//add a book to the array

function addBookToLibrary(title, author, pages, read){
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}


//display books on the page
function displayBooks() {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = ""; // Clear previous books

  myLibrary.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>by ${book.author}</p>
          <p>${book.pages} pages</p>
          <p class="read-status">${book.read ? "Read ✅" : "Not Read ❌"}</p>
          <button onclick="toggleRead(${index})">Toggle Read</button>
          <button onclick="removeBook(${index})">Remove</button>
      `;

      bookContainer.appendChild(bookCard);
  });
}

//remove a book
function removeBook(index){
  myLibrary.splice(index, 1);
  displayBooks();
}

// Handle form submission
document.getElementById("book-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Get form values
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").checked;

  // Check for missing values
  if (!title || !author || !pages) {
      alert("Please fill in all fields.");
      return;
  }

  // Add book to library
  addBookToLibrary(title, author, pages, read);

  // Close dialog and reset form
  document.getElementById("book-dialog").close();
  this.reset();
});

// Handle opening and closing the dialog
document.getElementById("new-book-btn").addEventListener("click", function () {
  document.getElementById("book-dialog").showModal();
});

document.getElementById("close-dialog").addEventListener("click", function () {
  document.getElementById("book-dialog").close();
});


// Prototype function to toggle read status
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  myLibrary[index].toggleReadStatus();
  displayBooks(); // Refresh the display
}
