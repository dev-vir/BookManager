// function Book(title, author, isbn) {
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
// }

// function UI() {

// }

// UI.prototype.addBooktoList = function(book) {
//     const list = document.querySelector('#book-list');

//     const row = document.createElement('tr');

//     row.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.isbn}</td>
//         <td><a href="#" class="delete">X</a></td>
//     `;

//     list.appendChild(row);
// }

// UI.prototype.clearField = function() {
//     document.getElementById('title').value = '';
//     document.getElementById('author').value = '';
//     document.getElementById('isbn').value = '';
// }

// UI.prototype.showAlert = function(message, className) {
//     const div = document.createElement('div');

//     div.className = `alert ${className}`;

//     div.appendChild(document.createTextNode(message));

//     const container = document.querySelector('.container');

//     const form = document.querySelector("#book-form");

//     container.insertBefore(div, form);

//     setTimeout(function(){
//         document.querySelector('.alert').remove()
//     }, 3000);
// }

// UI.prototype.deleteBook = function(target) {
//     if (target.className === 'delete') {
//         target.parentElement.parentElement.remove();
//     }
// }


// From ES6 Method

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBooktoList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
    
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');

        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000);
    }

    clearField() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();

            ui.addBooktoList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

const submit = document.getElementById('book-form');

submit.addEventListener('submit', function(e) {

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please Fill in all the result', 'error')
    }else {
        ui.addBooktoList(book);

        Store.addBook(book);

        ui.showAlert('Book Added to List', 'success');

        ui.clearField();
    }
    
    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book removed from List', 'success')
    
    e.preventDefault()
})