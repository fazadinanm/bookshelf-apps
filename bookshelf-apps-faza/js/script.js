const UNIT_BOOK = 'itemID';
const LIST_BOOK_BELUM_SELESAI = 'incompleteBookshelfList';
const LIST_BOOK_SELESAI = 'completeBookshelfList';

function newBook(judulBaru,penulisBaru,tahunBaru,selesaiBaru) {
    const judulBook = document.createElement('h3');
    judulBook.innerText = judulBaru;
    judulBook.classList.add('judulBook');

    const penulisBook = document.createElement("p");
    penulisBook.innerHTML = 'Penulis: <span class=\'penulisBook\'>'+penulisBaru+'</span>';

    const tahunBook = document.createElement("p");
    tahunBook.innerHTML = 'Tahun terbit: <span class=\'tahunBook\'>'+tahunBaru+'</span>';

    const tblCont = document.createElement('div');
    tblCont.classList.add('tbl-wrapper');

    if (!selesaiBaru)
        tblCont.append(bikinTombolCheck(), bikinTombolHapus());
    else
        tblCont.append(bikinTombolUlangi(), bikinTombolHapus());

    const cont = document.createElement('div');
    cont.classList.add('list');

    cont.append(judulBook, penulisBook, tahunBook,tblCont);
    return cont;
}

function tambahBuku() {
    const judulBaru = document.getElementById("inputJudulBuku").value;
    const penulisBaru = document.getElementById("inputPenulisBuku").value;
    const tahunBaru = document.getElementById("inputTahunBuku").value;
    const selesaiBaru = document.getElementById("inputBukuSelesai").checked;

    if(judulBaru == '' || penulisBaru == '' || tahunBaru == '') {
        alert('Kolom masih ada yang kosong!');
        return;
    }

    document.getElementById("inputJudulBuku").value = '';
    document.getElementById("inputPenulisBuku").value = '';
    document.getElementById("inputTahunBuku").value = '';
    document.getElementById("inputBukuSelesai").checked = false;

    const book = newBook(judulBaru,penulisBaru,tahunBaru,selesaiBaru);
    const objekBook = susunRakBook(judulBaru,penulisBaru,tahunBaru,selesaiBaru);

    book[UNIT_BOOK] = objekBook.id;
    books.push(objekBook);

    let listBook;
    if(selesaiBaru){
        listBook = LIST_BOOK_SELESAI;
    }
    else{
        listBook = LIST_BOOK_BELUM_SELESAI;
    }

    const bookList = document.getElementById(listBook);
    bookList.append(book);
    updateDataToStorage();
}


function bikinTombol(textTombol, eventListener) {
    const tombol = document.createElement('tombol');
    tombol.classList.add('tbl-action');
    tombol.innerHTML = textTombol;
    tombol.addEventListener("click", function (event) {
        eventListener(event);
    });
    return tombol;
}

function bikinTombolCheck() {
    return bikinTombol( 'Sudah Selesai dibaca' , function (event) {
        rakBukuSelesai(event.target.parentElement.parentElement);
    });
}

function rakBukuSelesai(unitBook) {
    const judulBook = unitBook.querySelector('#inputJudulBuku').innerText;
    const penulisBook = unitBook.querySelector('#inputPenulisBuku').innerText;
    const tahunBook = unitBook.querySelector('#inputTahunBuku').innerText;

    const bookBaru = newBook(judulBook, penulisBook, tahunBook, true);

    const book = temukanBook(unitBook[UNIT_BOOK]);
    book.isCompleted = true;
    bookBaru[UNIT_BOOK] = book.id;

    const listSudahSelesai = document.getElementById(LIST_BOOK_SELESAI);
    listSudahSelesai.append(bookBaru);
    unitBook.remove();

    updateDataToStorage();
}


function hapusDariRak(unitBook){
    let hapusBook = confirm('Hapus buku dari rak?');

    if(!hapusBook) return;

    const urutanBook = temukanIndexBook(unitBook[UNIT_BOOK]);
    books.splice(urutanBook, 1);
    unitBook.remove();

    updateDataToStorage();
}

function bikinTombolHapus(){
    return bikinTombol('Hapus buku dari rak' , function (event) {
        hapusDariRak(event.target.parentElement.parentElement);
    });
}

function bikinTombolUlangi() {
    return bikinTombol('Baca lagi' , function (event) {
        kembaliKeRakBukuSelesai(event.target.parentElement.parentElement);
    });
}

function kembaliKeRakBukuSelesai(unitBook) {
    const judulBook = unitBook.querySelector('#inputJudulBuku').innerText;
    const penulisBook = unitBook.querySelector('#inputPenulisBuku').innerText;
    const tahunBook = unitBook.querySelector('#inputTahunBuku').innerText;

    const bookBaru = newBook(judulBook, penulisBook, tahunBook, false);

    const book = temukanBook(unitBook[UNIT_BOOK]);
    book.isCompleted = false;
    bookBaru[UNIT_BOOK] = book.id;

    const listBelumSelesai = document.getElementById(LIST_BOOK_BELUM_SELESAI);
    listBelumSelesai.append(bookBaru);
    unitBook.remove();

    updateDataToStorage();
}

function dataBook(){
    const listBelumSelesai = document.getElementById(LIST_BOOK_BELUM_SELESAI);
    const listSudahSelesai = document.getElementById(LIST_BOOK_SELESAI);

    listBelumSelesai.innerHTML = '';
    listSudahSelesai.innerHTML = '';
  
    for(book of books){
        const bookBaru = newBook(book.title, book.author, book.year, book.isCompleted);
        bookBaru[UNIT_BOOK] = book.id;
  
        if(book.isCompleted){
            listSudahSelesai.append(bookBaru);
        } else {
            listBelumSelesai.append(bookBaru);
        }
    }
}

function searchBook(){
    const cari = document.getElementById('searchBookTitle').value();
    const listBelumSelesai = document.getElementById(LIST_BOOK_BELUM_SELESAI);
    let listSudahSelesai = document.getElementById(LIST_BOOK_SELESAI);

    listBelumSelesai.innerHTML = '';
    listSudahSelesai.innerHTML = '';

    if(cari == '') {
        dataBook();
        return;
    }

    for(book of books){[]
        if(book.judulBook().includes(cari)){
            const bookBaru = newBook(book.title, book.author, book.year, book.isCompleted);
            bookBaru[UNIT_BOOK] = book.id;
      
            if(book.isCompleted){
                listSudahSelesai.append(bookBaru);
            } else {
                listBelumSelesai.append(bookBaru);
            }
        }
    }
}
