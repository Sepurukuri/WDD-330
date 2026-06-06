import { createMovieCard }
from "./movieCard.mjs";

export function renderMovies(
    movies,
    container
) {

    container.innerHTML = "";

    movies.forEach(movie => {

        const card =
            createMovieCard(movie);

        container.appendChild(card);

    });
}

export function showLoading(container) {

    container.innerHTML =
        "<p>Loading movies...</p>";
}

export function showError(container) {

    container.innerHTML =
        "<p>Unable to load content.</p>";
}