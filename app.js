class Book{
    static idStatic = 0;

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.id = Book.idStatic;
        Book.idStatic++
    }

    getTitle(){ return this.title; }
    setTitle(title) { this.title = title }

    getAuthor(){ return this.author; }
    setAuthor(author) { this.author = author }

    getIsbn(){ return this.isbn; }
    setIsbn (isbn) { this.isbn = isbn }

}

class UI {
    static table = document.querySelector("#table");

    static bookToEdit =  null;

    static books = [
            new Book("Dev web", "LeRoi David", "I994403"),
            new Book("Naruto", "Kissimoto", "JHFHF99"),
            new Book("Death note", "Yagura", "HFJF6644")
    ];

    static addBookToTalble() {
        UI.books.forEach((book) =>{
            UI.AddRow(book)
        })
    }

    static AddRow(book) {
        let tbody = document.querySelector("tbody");
        let row = document.createElement("tr");
        row.setAttribute("id", "id"+book.id);
        let tdId = document.createElement("td");
        tdId.innerText =  book.id;
        row.appendChild(tdId);

        let tdTitle = document.createElement("td");
        tdTitle.innerText =  book.title;
        row.appendChild(tdTitle);

        let tdAuthor = document.createElement("td");
        tdAuthor.innerText =  book.author;
        row.appendChild(tdAuthor);

        let tdIsbn = document.createElement("td");
        tdIsbn.innerText =  book.isbn;
        row.appendChild(tdIsbn);

        let aEdit = document.createElement('a');
        aEdit.setAttribute('class', 'btn btn-success btn-sm btnEdit');
        aEdit.setAttribute("data-toggle", "modal")
        aEdit.setAttribute("data-target", "#exampleModal")
        aEdit.setAttribute("data-whatever", "@mdo")
        aEdit.innerHTML = 'Edit';
        let aDel = document.createElement('a');
        aDel.setAttribute('class', 'btn btn-danger btn-sm btnDel');
        aDel.innerHTML = 'Del';
        let tdEdit = document.createElement('td');
        tdEdit.appendChild(aEdit);
        tdEdit.appendChild(aDel);
        row.appendChild(tdEdit);

        tbody.appendChild(row)
        updateEditLinks();
        updateDelLinks()
     }

    static CreateBook(e) {
        e.preventDefault();
        if(UI.validateForm()){
        } else {
            let book = new Book(inputTitle.value, inputAuthor.value, inputIsbn.value);
            UI.AddRow(book);
            UI.books.push(book);
            console.log(UI.books);
            form.reset();
            alert("Enregistrement réuisssit")
        }

    }

    static validateForm() {
        let error = false;
        errorTitle.innerHTML = "";
        errorAuthor.innerHTML = "";
        errorIsbn.innerHTML = "";

        if (inputTitle.value.length < 2) {
            errorTitle.innerHTML = "Le champ title est incorrecte";
            error = true
        } else if (inputAuthor.value.length < 2) {
            errorAuthor.innerHTML = "Le champ author est incorrecte";
            error = true
        } else if (inputIsbn.value.length < 5) {
            error = true;
            errorIsbn.innerHTML = "Le champ Isbn est incorrecte"
        }
        return error;
    }

    static editRow(e) {
        let id = parseInt(e.target.parentElement.parentElement.firstChild.innerHTML)
        UI.getBookToEdit(id)
        btnSaveModal.removeAttribute("data-dismiss", "modal")
    }

    static getBookToEdit(id) {
        UI.books.forEach((book, index) => {
            if(book.id === id){
                console.log(book)
                UI.setFormValueEdit(book)
                UI.bookToEdit = book
            }
        })
    }

    static setFormValueEdit(book) {
        inputTitleModal.value = book.title
        inputAuthorModal.value = book.author
        inputIsbnModal.value = book.isbn
    }

    static deleteRow(e) {
        let id = parseInt(e.target.parentElement.parentElement.firstChild.innerHTML)
        UI.getBookToDelete(id)
    }

    static getBookToDelete(id) {
        UI.books.forEach((book, index) => {
            if(book.id === id){
                console.log(book, index)
                UI.deleteRowData(book, index)
            }
        })
    }

    static deleteRowData (book, index) {
        let rs = confirm("Voulez supprimer le livre")
        if(rs) {
           let tr =  document.querySelector("#id"+book.id)
           tr.parentElement.removeChild(tr)
           UI.books.splice(index, 1)

        }
    }

    static onEdit(e) {
        e.preventDefault()
        let rowToUpdate = document.querySelector("#id"+UI.bookToEdit.id)
        let tds = rowToUpdate.children
        tds[1].innerHTML = inputTitleModal.value
        tds[2].innerHTML = inputAuthorModal.value
        tds[3].innerHTML = inputIsbnModal.value
        UI.books.forEach((book, index) => {
            if(book.id === UI.bookToEdit.id) {
                book.setTitle(UI.bookToEdit.title);
                book.setAuthor(UI.bookToEdit.author);
                book.setIsbn(UI.bookToEdit.isbn);
                btnSaveModal.setAttribute("data-dismiss", "modal")
            }
        });
        UI.bookToEdit = null;


    }
}

let inputTitle = document.querySelector("#title");
let inputAuthor = document.querySelector("#author");
let inputIsbn = document.querySelector("#isbn");

let errorTitle = document.querySelector("#errorTitle");
let errorAuthor = document.querySelector("#errorAuthor");
let errorIsbn = document.querySelector("#errorIsbn");

let form = document.querySelector("#form");

form.addEventListener("submit", UI.CreateBook);

var updateEditLinks = function(){
    editLinks = document.querySelectorAll(".btnEdit");
    editLinks.forEach((link) => {
        link.addEventListener("click", UI.editRow)
    });
}
updateEditLinks()

var updateDelLinks = function(){
    deleteLinks = document.querySelectorAll(".btnDel");
    deleteLinks.forEach((link) => {
        link.addEventListener("click", UI.deleteRow)
    });
}
updateDelLinks()

let btnSaveModal = document.querySelector("#btnSaveModal")
btnSaveModal.addEventListener("click", UI.onEdit)

let inputTitleModal = document.querySelector("#inputModalTitle");
let inputAuthorModal = document.querySelector("#inputModalAuthor");
let inputIsbnModal = document.querySelector("#inputModalIsbn");



UI.addBookToTalble();
