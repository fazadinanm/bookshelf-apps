document.addEventListener('DOMContentLoaded', function () {

    const inputBook = document.getElementById('input-Book');

    inputBook.addEventListener('submit', function (event) {
        event.preventDefault();
        tambahBuku();
    });

    const cariBook = document.getElementById('search-Book');

    cariBook.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
 });

document.addEventListener('ondataloaded', () => {
    dataBook();
});
