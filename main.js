const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const form = document.getElementById('searchForm');
const showMoreBtn  = document.getElementById('showmore');
showMoreBtn.style.display = 'none';

showMoreBtn.addEventListener('click', function () {
  page += 10;
  Show();
});

searchButton.addEventListener('click', Show);
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission and page reload
  Show();
});

let page = 10

async function Show() {
  showMoreBtn.style.display = 'block';
  const query = searchInput.value.trim();
  if (query === '') return;

  const apiKey = 'Z1esbGm9D-RdAyZe69eyjS3iRZGtiAyCtQESa2Zh4u0';
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${page}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    displayResults(data.results);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayResults(results) {
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    console.log(result);
    const resultElement = document.createElement('div');
    resultElement.classList.add('col-lg-4', 'col-sm-6', 'my-3', 'h-100');

    resultElement.innerHTML = `
      <div class="card ">
        <img class="card-img-top" src="${result.urls.small}">
        <div class="card-body">
          <p class="card-text">${result.alt_description}</p>
        </div>
      </div>
    `;

    resultsContainer.appendChild(resultElement);
  });
}