import {
  getMovieDetails,
  getTvDetails,
  getTrailerFromTMDB,
  getPosterUrl,
} from "./apiService.mjs";

const container = document.querySelector("#details");

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    id: params.get("id"),
    type: params.get("type") || "movie",
  };
}

function formatGenres(genres) {
  if (!genres || genres.length === 0) {
    return "Unknown";
  }

  return genres.map((genre) => genre.name).join(", ");
}

async function renderDetails() {
  const { id, type } = getQueryParams();

  if (!id) {
    container.innerHTML = `
      <div class="details-content">
        <h2>Movie not found</h2>
        <p>No valid movie or TV show ID was provided.</p>
      </div>
    `;
    return;
  }

  try {
    let item;

    if (type === "tv") {
      item = await getTvDetails(id);
    } else {
      item = await getMovieDetails(id);
    }

    const trailer = await getTrailerFromTMDB(id, type);

    const title = item.title || item.name;
    const release =
      item.release_date ||
      item.first_air_date ||
      "Unknown";

    const runtime =
      item.runtime ||
      (item.episode_run_time?.[0] ?? "N/A");

    container.innerHTML = `
      <img
        src="${getPosterUrl(item.poster_path)}"
        alt="${title}"
      >

      <div class="details-content">

        <h1>${title}</h1>

        <p>
          <strong>⭐ Rating:</strong>
          ${Number(item.vote_average).toFixed(1)}
        </p>

        <p>
          <strong>📅 Release:</strong>
          ${release}
        </p>

        <p>
          <strong>🎭 Genres:</strong>
          ${formatGenres(item.genres)}
        </p>

        <p>
          <strong>⏱ Runtime:</strong>
          ${runtime} ${
      runtime !== "N/A" ? "minutes" : ""
    }
        </p>

        <p>
          ${item.overview || "No overview available."}
        </p>

        ${
          trailer
            ? `
          <iframe
            src="https://www.youtube.com/embed/${trailer.key}"
            title="Official Trailer"
            allowfullscreen
          ></iframe>
        `
            : `
          <p>
            Trailer not available.
          </p>
        `
        }

      </div>
    `;
  } catch (error) {
    console.error(error);

    container.innerHTML = `
      <div class="details-content">

        <h2>Error</h2>

        <p>
          Unable to load this content.
        </p>

      </div>
    `;
  }
}

renderDetails();