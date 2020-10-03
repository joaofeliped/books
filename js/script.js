let tableBody;
let resultLength;

const start = async () => {
  const response = await fetch('http://biblioteca.supero.com.br/api/Livros');
  const books = await response.json();

  console.log(books);
  renderTableBody(books);
};

const renderTableBody = (books) => {
  const { items, totalCount } = books;

  resultLength = document.querySelector('#resultLength');
  resultLength.innerHTML = '';
  resultLength.textContent = totalCount;

  tableBody = document.querySelector('#tableBody');
  tableBody.innerHTML = '';

  items.forEach((book) => {
    const tr = document.createElement('tr');

    const tdBook = document.createElement('td');
    tdBook.textContent = book.titulo;

    const tdAuthor = document.createElement('td');
    tdAuthor.textContent = book.autor;

    const tdEditor = document.createElement('td');
    tdEditor.textContent = book.editora;

    const tdYear = document.createElement('td');
    tdYear.textContent = book.ano;

    const tdActions = document.createElement('td');

    const ancorActions = document.createElement('a');
    ancorActions.href = `./detail.html?id=${book.id}`;
    ancorActions.textContent = 'Detalhes';

    tdActions.appendChild(ancorActions);

    tr.appendChild(tdBook);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdEditor);
    tr.appendChild(tdYear);
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  });
};

start();
