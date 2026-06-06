import { getTrending } from "./apiService.mjs";
import { search } from "./searchModule.mjs";
import {
    renderMovies,
    showLoading,
    showError
} from "./uiModule.mjs";
import { loadPartials } from "./loadPartials.mjs";

const movieContainer =
    document.getElementById("movieContainer");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

async function loadTrendingMovies() {

    try {

        showLoading(movieContainer);

        const data =
            await getTrending();

        if (!data.results) {

            throw new Error(
                "No trending movies found."
            );

        }

        renderMovies(
            data.results,
            movieContainer
        );

    } catch (error) {

        console.error(error);

        showError(
            movieContainer,
            "Unable to load trending content."
        );

    }

}

async function performSearch() {

    const query =
        searchInput.value.trim();

    if (!query) {

        alert(
            "Please enter a movie or TV show title."
        );

        return;

    }

    try {

        showLoading(movieContainer);

        const data =
            await search(query);

        if (
            !data.results ||
            data.results.length === 0
        ) {

            movieContainer.innerHTML = `
                <div class="empty-message">
                    <h3>No results found</h3>
                    <p>
                        Try searching for another movie
                        or TV show.
                    </p>
                </div>
            `;

            return;

        }

        renderMovies(
            data.results,
            movieContainer
        );

    } catch (error) {

        console.error(error);

        showError(
            movieContainer,
            "Search failed. Please try again."
        );

    }

}

function setupEventListeners() {

    searchBtn.addEventListener(
        "click",
        performSearch
    );

    searchInput.addEventListener(
        "keypress",
        (event) => {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}

async function initializeApp() {

    await loadPartials();

    setupEventListeners();

    await loadTrendingMovies();

}

initializeApp();