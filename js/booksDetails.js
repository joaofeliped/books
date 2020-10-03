let bookId;

const start = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  bookId = urlParams.get('id');

  await searchBook(bookId);

  const deleteBook = document.querySelector('#deleteBook');
  deleteBook.addEventListener('click', handleDeleteBook);
};

const searchBook = async (id) => {
  const response = await fetch(
    `http://biblioteca.supero.com.br/api/Livros/${id}`
  );
  const book = await response.json();

  const title = document.querySelector('#title');
  title.value = '';
  title.value = book.titulo;

  const language = document.querySelector('#language');
  language.value = '';
  language.value = book.idioma;

  const isbn = document.querySelector('#isbn');
  isbn.value = '';
  isbn.value = book.isbn;

  const width = document.querySelector('#width');
  width.value = '';
  width.value = book.largura;

  const author = document.querySelector('#author');
  author.value = '';
  author.value = book.autor;

  const editor = document.querySelector('#editor');
  editor.value = '';
  editor.value = book.editora;

  const year = document.querySelector('#year');
  year.value = '';
  year.value = book.ano;

  const weight = document.querySelector('#weight');
  weight.value = '';
  weight.value = book.peso;

  const lenght = document.querySelector('#lenght');
  lenght.value = '';
  lenght.value = book.comprimento;

  const height = document.querySelector('#height');
  height.value = '';
  height.value = book.altura;
};

const handleDeleteBook = async () => {
  const response = await fetch(
    `http://biblioteca.supero.com.br/api/Livros/${bookId}`,
    {
      method: 'DELETE',
    }
  );

  alert('Livro deletado com sucesso');
  window.location = '/';
};

start();
