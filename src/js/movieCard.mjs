import { getPosterUrl } from "./apiService.mjs";

const FAVORITES_KEY = "movie-tv-favorites";

/**
 * Load favorites from localStorage.
 * @returns {Array}
 */
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save favorites to localStorage.
 * @param {Array} favorites
 */
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Check whether an item is already favorited.
 * @param {number|string} id
 * @returns {boolean}
 */
function isFavorite(id) {
  return loadFavorites().some((item) => item.id === id);
}

/**
 * Toggle favorite status for an item.
 * @param {Object} media
 * @returns {boolean} true if now favorited
 */
export function toggleFavorite(media) {
  const favorites = loadFavorites();

  const index = favorites.findIndex((item) => item.id === media.id);

  if (index >= 0) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  }

  favorites.push({
    id: media.id,
    media_type: media.media_type || "movie",
    title: media.title || media.name,
    poster_path: media.poster_path,
    vote_average: media.vote_average,
    release_date: media.release_date || media.first_air_date,
  });

  saveFavorites(favorites);
  return true;
}

/**
 * Get all favorite items.
 * @returns {Array}
 */
export function getFavorites() {
  return loadFavorites();
}

/**
 * Create a movie/show card element.
 * @param {Object} media
 * @returns {HTMLElement}
 */
export function createMovieCard(media) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const title = media.title || media.name || "Untitled";

  const release =
    media.release_date ||
    media.first_air_date ||
    "Unknown";

  const year =
    release && release.length >= 4
      ? release.substring(0, 4)
      : "—";

  const overview =
    media.overview?.trim() ||
    "No description available.";

  const rating =
    typeof media.vote_average === "number"
      ? media.vote_average.toFixed(1)
      : "N/A";

  const favorite = isFavorite(media.id);

  card.innerHTML = `
    <img
      src="${getPosterUrl(media.poster_path)}"
      alt="${title}"
      loading="lazy"
    />

    <div class="movie-info">

      <h3>${title}</h3>

      <div class="movie-meta">

        <span>${year}</span>

        <span class="rating">⭐ ${rating}</span>

      </div>

      <p class="overview">
        ${overview}
      </p>

      <button
        class="favorite-btn"
        type="button"
      >
        ${favorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
      </button>

    </div>
  `;

  // Navigate to details page when clicking outside button.
  card.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-btn")) {
      return;
    }

    const type = media.media_type || "movie";

    window.location.href =
      `../details/index.html?id=${media.id}&type=${type}`;
  });

  // Favorite button.
  const button = card.querySelector(".favorite-btn");

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const nowFavorite = toggleFavorite(media);

    button.textContent = nowFavorite
      ? "❤️ Remove Favorite"
      : "🤍 Add Favorite";
  });

  return card;
}

/**
 * Render an array of media items into a container.
 * @param {HTMLElement} container
 * @param {Array} mediaList
 */
export function renderMovieGrid(container, mediaList) {
  container.innerHTML = "";

  if (!mediaList.length) {
    container.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;">
        No results found.
      </p>
    `;
    return;
  }

  mediaList.forEach((media) => {
    container.appendChild(createMovieCard(media));
  });
}