export function createMovieCard(item) {

    const card =
        document.createElement("div");

    card.classList.add("movie-card");

    const poster =
        item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://placehold.co/500x750";

    card.innerHTML = `
    
        <img src="${poster}">
        
        <h3>
            ${item.title || item.name}
        </h3>
        
        <p>
            ⭐ ${item.vote_average?.toFixed(1)}
        </p>
        
    `;

    card.addEventListener("click", () => {

        const mediaType =
            item.media_type || "movie";

        window.location.href =
            `../details/index.html?id=${item.id}&type=${mediaType}`;
    });

    return card;
}