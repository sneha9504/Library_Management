class Book {
  constructor(title, author, isbn, publicationYear, genre, quantity) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publicationYear = publicationYear || 'N/A';
    this.genre = genre || 'N/A';
    this.quantity = parseInt(quantity) || 1;
    if (this.quantity < 0) this.quantity = 0;
    this.borrowCopies = 0;
  }

  getAvailableCopies() {
    const available = this.quantity - this.borrowCopies;
    return available > 0 ? available : 0;
  }

  borrowCopy() {
    if (this.getAvailableCopies() > 0) {
      this.borrowCopies++;
      alert(`You have borrowed a copy of "${this.title}".`);
    } else {
      alert(`No copies of "${this.title}" are available.`);
    }
  }

  returnCopy() {
    if (this.borrowCopies > 0) {
      this.borrowCopies--;
      alert(`You have returned a copy of "${this.title}".`);
    } else {
      alert(`No copies of "${this.title}" were borrowed.`);
    }
  }

  displayDetails() {
  return `
    <div class="book-card">
      <h3>${this.title}</h3>
      <div class="book-meta">
        <span><strong>Author:</strong> ${this.author}</span>
        <span><strong>ISBN:</strong> ${this.isbn}</span>
        <span><strong>Year:</strong> ${this.publicationYear}</span>
        <span><strong>Genre:</strong> ${this.genre}</span>
        <span><strong>Total Copies:</strong> ${this.quantity}</span>
        <span><strong>Available:</strong> ${this.getAvailableCopies()}</span>
      </div>
    </div>
  `;
}
}

class Library {
  constructor(name) {
    this.libraryName = name;
    this.books = [];
  }

  addBook(book) {
    if (!(book instanceof Book)) return alert("Invalid Book");

    const existing = this.findBookByISBN(book.isbn);
    if (existing) {
      existing.quantity += book.quantity;
      alert(`Updated quantity of "${existing.title}" to ${existing.quantity}`);
    } else {
      this.books.push(book);
      alert(`Added "${book.title}" to the library.`);
    }
  }

  findBookByISBN(isbn) {
    return this.books.find(book => book.isbn === isbn);
  }

  listAllBooks() {
    return this.books.map(book => book.displayDetails()).join('');
  }
}

const myLibrary = new Library("Frontend Library");

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;
  const quantity = document.getElementById('quantity').value;

  if (!title || !author || !isbn || !quantity) {
    alert("Title, Author, ISBN, and Quantity are required.");
    return;
  }

  const book = new Book(title, author, isbn, year, genre, quantity);
  myLibrary.addBook(book);
  displayBooks();
}

function displayBooks() {
  document.getElementById('bookList').innerHTML = myLibrary.listAllBooks();
}

function borrowBook() {
  const isbn = document.getElementById('borrowIsbn').value;
  const book = myLibrary.findBookByISBN(isbn);
  if (book) {
    book.borrowCopy();
    displayBooks();
  } else {
    alert("Book not found.");
  }
}

function returnBook() {
  const isbn = document.getElementById('borrowIsbn').value;
  const book = myLibrary.findBookByISBN(isbn);
  if (book) {
    book.returnCopy();
    displayBooks();
  } else {
    alert("Book not found.");
  }
}
