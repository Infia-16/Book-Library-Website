
let bookLibrary = JSON.parse(localStorage.getItem('books')) || [];


const bookForm = document.getElementById('book-form');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookYearInput = document.getElementById('book-year');
const bookList = document.getElementById('book-list');


function displayBooks() {
    bookList.innerHTML = '';
    bookLibrary.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.classList.add('book-item');
        
        bookItem.innerHTML = `
            <span>
                <strong>${book.title}</strong> by ${book.author} (${book.year})
            </span>
            <span class="${book.read ? 'read' : 'unread'}">
                ${book.read ? 'Read' : 'Unread'}
            </span>
            <button class="toggle-read" data-index="${index}">Toggle Read</button>
            <button class="delete-book" data-index="${index}">Delete</button>
        `;

        
        bookItem.querySelector('.toggle-read').addEventListener('click', toggleReadStatus);
        bookItem.querySelector('.delete-book').addEventListener('click', deleteBook);

        bookList.appendChild(bookItem);
    });
}


bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newBook = {
        title: bookTitleInput.value,
        author: bookAuthorInput.value,
        year: bookYearInput.value,
        read: false
    };

    
    bookLibrary.push(newBook);
    localStorage.setItem('books', JSON.stringify(bookLibrary));

    
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    displayBooks();
});


function toggleReadStatus(event) {
    const index = event.target.dataset.index;
    bookLibrary[index].read = !bookLibrary[index].read;


    localStorage.setItem('books', JSON.stringify(bookLibrary));
    displayBooks();
}


function deleteBook(event) {
    const index = event.target.dataset.index;
    bookLibrary.splice(index, 1);

    
    localStorage.setItem('books', JSON.stringify(bookLibrary));
    displayBooks();
}

displayBooks();
