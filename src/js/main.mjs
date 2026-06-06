import {
    getTrending
}
from "./apiService.mjs";

import {
    renderMovies,
    showLoading
}
from "./uiModule.mjs";

import {
    search
}
from "./searchModule.mjs";

const container =
    document.getElementById(
        "movieContainer"
    );

const searchBtn =
    document.getElementById(
        "searchBtn"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

async function loadTrending() {

    showLoading(container);

    const data =
        await getTrending();

    renderMovies(
        data.results,
        container
    );
}

searchBtn.addEventListener(
    "click",
    async () => {

        const query =
            searchInput.value;

        const results =
            await search(query);

        renderMovies(
            results.results,
            container
        );
    }
);

loadTrending();