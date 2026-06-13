import {
  getTrendingMovies,
  searchMedia,
  getGenres,
  discoverMovies,
} from "./apiService.mjs";

import {
  renderMovieGrid,
} from "./movieCard.mjs";

const movieGrid = document.querySelector("#movieGrid");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const genreSelect = document.querySelector("#genreSelect");
const sortSelect = document.querySelector("#sortSelect");

/**
 * Display a loading spinner.
 */
function showLoader() {
  movieGrid.innerHTML = `
    <div class="loader"></div>
  `;
}

/**
 * Display an error message.
 * @param {string} message
 */
function showError(message) {
  movieGrid.innerHTML = `
    <p style="text-align:center;grid-column:1/-1;">
      ${message}
    </p>
  `;
}

/**
 * Load trending movies and TV shows.
 */
async function loadTrending() {
  try {
    showLoader();

    const results = await getTrendingMovies();

    renderMovieGrid(movieGrid, results);
  } catch (error) {
    console.error(error);

    showError(
      "Unable to load trending content."
    );
  }
}

/**
 * Populate the genre dropdown.
 */
async function populateGenres() {
  try {
    const genres = await getGenres();

    genres.forEach((genre) => {
      const option = document.createElement("option");

      option.value = genre.id;
      option.textContent = genre.name;

      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Perform a search.
 */
async function performSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    loadTrending();
    return;
  }

  try {
    showLoader();

    const results = await searchMedia(query);

    renderMovieGrid(movieGrid, results);
  } catch (error) {
    console.error(error);

    showError(
      "Search failed."
    );
  }
}

/**
 * Apply filters using Discover endpoint.
 */
async function applyFilters() {
  try {
    showLoader();

    const results = await discoverMovies({
      genre: genreSelect.value,
      sortBy: sortSelect.value,
    });

    renderMovieGrid(movieGrid, results);
  } catch (error) {
    console.error(error);

    showError(
      "Unable to apply filters."
    );
  }
}

/* -------------------------
   Event Listeners
------------------------- */

searchButton?.addEventListener(
  "click",
  performSearch
);

searchInput?.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  }
);

genreSelect?.addEventListener(
  "change",
  applyFilters
);

sortSelect?.addEventListener(
  "change",
  applyFilters
);

/* -------------------------
   Initialize App
------------------------- */

async function init() {
  await populateGenres();
  await loadTrending();
}

init();