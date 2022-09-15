let books = [];
const STORAGE_KEY = "BOOKSHELF_APPS";

function susunRakBook(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author, 
        year,
        isCompleted
    };
}

function temukanBook(book_Id) {
    for (const book of books) {
        if (book.id === book_Id)
            return book;
    }
    return null;
}

function temukanIndexBook(book_Id) {
    for (const index of books) {
        if (books[index].id === book_Id){
            return index;
        }
    }
    return -1;
}

function isStorageExist(){
    if (typeof (Storage) === undefined) {
        alert("Browser anda tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;
    document.dispatchEvent(new Event("ondataloaded"));
}