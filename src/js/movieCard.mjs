import { getPosterUrl } from "./apiService.mjs";
import {
  isFavorite,
  toggleFavorite,
  getFavorites,
} from "./favoritesModule.mjs";

// Re-export so favorites.mjs can import from here if desired.
export { getFavorites };

/**
 * Create a movie/show card element.
 * @param {Object} media
 * @returns {HTMLElement}
 */
export function createMovieCard(media) {
  const card = document.createElement("article");
  card.className = "movie-card";

  const title = media.title || media.name || "Untitled";

  const releaseDate =
    media.release_date ||
    media.first_air_date ||
    "";

  const year =
    releaseDate.length >= 4
      ? releaseDate.substring(0, 4)
      : "—";

  const overview =
    media.overview?.trim() ||
    "No description available.";

  const rating =
    typeof media.vote_average === "number"
      ? media.vote_average.toFixed(1)
      : "N/A";

  let favorite = isFavorite(media.id);

  card.innerHTML = `
    <img
      src="${getPosterUrl(media.poster_path)}"
      alt="${title}"
      loading="lazy"
      onerror="this.src='/images/placeholder.png'"
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
        ${
          favorite
            ? "❤️ Remove Favorite"
            : "🤍 Add Favorite"
        }
      </button>

    </div>
  `;

  // Navigate to details page
  card.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-btn")) {
      return;
    }

    const mediaType = media.media_type || "movie";

    window.location.href =
      `../details/index.html?id=${media.id}&type=${mediaType}`;
  });

  // Favorite button
  const favoriteButton =
    card.querySelector(".favorite-btn");

  favoriteButton.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      favorite = toggleFavorite({
        id: media.id,
        media_type: media.media_type || "movie",
        title: media.title || media.name,
        poster_path: media.poster_path,
        vote_average: media.vote_average,
        release_date:
          media.release_date ||
          media.first_air_date,
      });

      favoriteButton.textContent = favorite
        ? "❤️ Remove Favorite"
        : "🤍 Add Favorite";
    }
  );

  return card;
}

/**
 * Render movie cards into a container.
 * @param {HTMLElement} container
 * @param {Array} mediaList
 */
export function renderMovieGrid(
  container,
  mediaList
) {
  container.innerHTML = "";

  if (!mediaList || mediaList.length === 0) {
    container.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        No movies or TV shows found.
      </p>
    `;
    return;
  }

  mediaList.forEach((media) => {
    container.appendChild(
      createMovieCard(media)
    );
  });
}
