import { getDetails } from "./apiService.mjs";

export async function renderDetails() {

    const detailsContainer =
        document.getElementById(
            "detailsContainer"
        );

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    const type =
        params.get("type") || "movie";

    if (!id) {

        detailsContainer.innerHTML = `
            <div class="error-message">
                <h2>Movie Not Found</h2>
                <p>
                    No movie information was provided.
                </p>
            </div>
        `;

        return;

    }

    try {

        const data =
            await getDetails(
                id,
                type
            );

        const title =
            data.title ||
            data.name ||
            "Unknown Title";

        const releaseDate =
            data.release_date ||
            data.first_air_date ||
            "Not Available";

        const rating =
            data.vote_average
                ? data.vote_average.toFixed(1)
                : "N/A";

        const poster =
            data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : "https://placehold.co/500x750?text=No+Poster";

        const overview =
            data.overview ||
            "No description available.";

        const genres =
            data.genres
                ?.map(
                    genre => genre.name
                )
                .join(", ") ||
            "Not Available";

        detailsContainer.innerHTML = `

            <div class="details-layout">

                <div class="details-poster">

                    <img
                        src="${poster}"
                        alt="${title}"
                    >

                </div>

                <div class="details-info">

                    <h1>${title}</h1>

                    <div class="details-meta">

                        <span>
                            ⭐ Rating: ${rating}
                        </span>

                        <span>
                            📅 Release:
                            ${releaseDate}
                        </span>

                    </div>

                    <div class="details-genres">

                        <h3>Genres</h3>

                        <p>${genres}</p>

                    </div>

                    <div class="details-description">

                        <h3>Synopsis</h3>

                        <p>${overview}</p>

                    </div>

                    <div class="details-actions">

                        <a
                            href="../home/index.html"
                            class="back-btn"
                        >
                            ← Back to Home
                        </a>

                    </div>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(error);

        detailsContainer.innerHTML = `
            <div class="error-message">

                <h2>
                    Unable to Load Details
                </h2>

                <p>
                    Something went wrong while
                    retrieving movie information.
                </p>

            </div>
        `;

    }

}