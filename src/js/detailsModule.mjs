import { getDetails }
from "./apiService.mjs";

export async function renderDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    const type =
        params.get("type");

    const data =
        await getDetails(id, type);

    const container =
        document.getElementById(
            "detailsContainer"
        );

    const poster =
        data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : "";

    container.innerHTML = `

        <img src="${poster}">

        <h1>
            ${data.title || data.name}
        </h1>

        <p>
            ${data.overview}
        </p>

        <p>
            Rating:
            ${data.vote_average}
        </p>

        <p>
            Release:
            ${data.release_date || data.first_air_date}
        </p>

    `;
}
