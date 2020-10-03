const limit = 10;
let tableBody;
let resultLength;

let actualPage = 1;
let isIcon = false;

const start = async () => {
  const response = await fetch('http://biblioteca.supero.com.br/api/Livros');
  const books = await response.json();

  renderTableBody(books);

  const buttonSearch = document.querySelector('#buttonSearch');
  buttonSearch.addEventListener('click', handleSearch);
};

const handleSearch = async () => {
  const inputSearch = document.querySelector('#inputSearch');
  const initialYear = document.querySelector('#initialYear');
  const finalYear = document.querySelector('#finalYear');

  let query = 'http://biblioteca.supero.com.br/api/Livros?';

  if (inputSearch.value) {
    query += `Busca=${inputSearch.value}&`;
  }

  if (initialYear.value) {
    query += `AnoInicial=${initialYear.value}&`;
  }

  if (finalYear.value) {
    query += `AnoFinal=${finalYear.value}`;
  }

  const response = await fetch(query);
  const books = await response.json();

  renderTableBody(books);
};

const renderTableBody = (books, from) => {
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

  handlePagination({ items, totalCount, from });
};

const handlePagination = ({ totalCount, from = 1 }) => {
  const pagination = document.querySelector('#pagination');
  pagination.innerHTML = '';

  const totalPages = (totalCount / limit).toFixed(0);

  const totalPagesBiggerThanFive = totalPages > 5;

  const createUntil = totalPagesBiggerThanFive
    ? from < totalPages - 5
      ? from + 5
      : from
    : totalPages;

  const firstIcon = document.createElement('i');
  firstIcon.classList.add('material-icons');
  firstIcon.textContent = 'chevron_left';
  firstIcon.id = 'iconMinus';

  const firstA = document.createElement('a');
  firstA.href = '#!';

  firstA.appendChild(firstIcon);

  const firstLi = document.createElement('li');
  firstLi.classList.add('waves-effect');

  if (from === 1) {
    firstLi.classList.add('disabled');
  }

  firstLi.addEventListener('click', changePaginationPage);
  firstLi.appendChild(firstA);

  pagination.appendChild(firstLi);

  for (let i = from; i <= createUntil; i++) {
    const a = document.createElement('a');
    a.textContent = i;
    a.href = '#!';

    const li = document.createElement('li');
    li.classList.add('waves-effect');
    li.id = `li${i}`;

    if (i === from) {
      li.classList.add('active');
    }

    li.addEventListener('click', changePaginationPage);
    li.appendChild(a);

    pagination.appendChild(li);
  }

  if (totalPagesBiggerThanFive) {
    const intervalSpan = document.createElement('span');
    intervalSpan.textContent = '...';

    const intervalLi = document.createElement('li');
    intervalLi.classList.add('waves-effect');

    intervalLi.appendChild(intervalSpan);

    pagination.appendChild(intervalLi);

    const totalA = document.createElement('a');
    totalA.textContent = totalPages;
    totalA.href = '#!';

    const totalli = document.createElement('li');
    totalli.id = `li${totalPages}`;
    totalli.classList.add('waves-effect');

    totalli.addEventListener('click', changePaginationPage);
    totalli.appendChild(totalA);

    pagination.appendChild(totalli);
  }

  const lastIcon = document.createElement('i');
  lastIcon.classList.add('material-icons');
  lastIcon.textContent = 'chevron_right';
  lastIcon.id = 'iconPlus';

  const lastA = document.createElement('a');
  lastA.href = '#!';

  lastA.appendChild(lastIcon);

  const lastLi = document.createElement('li');
  lastLi.id = 'liIconPlus';
  lastLi.classList.add('waves-effect');

  lastLi.addEventListener('click', changePaginationPage);
  lastLi.appendChild(lastA);

  pagination.appendChild(lastLi);
};

const changePaginationPage = async (event) => {
  const lastActive = document.querySelector(`#li${actualPage}`);
  lastActive.classList.remove('active');

  const id = event.target.id;

  if (id === 'iconPlus') {
    actualPage += 1;
  } else if (id === 'iconMinus') {
    actualPage--;
  } else {
    actualPage = parseInt(event.target.textContent, 10);
  }

  const response = await fetch(
    `http://biblioteca.supero.com.br/api/Livros?MaxResultCount=${limit}&SkipCount=${actualPage}`
  );
  const books = await response.json();

  renderTableBody(books, actualPage);

  const li = document.querySelector(`#li${actualPage}`);
  li.classList.add('active');
};

start();
