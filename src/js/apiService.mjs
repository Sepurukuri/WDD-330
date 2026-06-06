const API_KEY = import.meta.env.VITE_TMDB_KEY;

const BASE_URL =
    "https://api.themoviedb.org/3";

export async function getTrending() {

    const response =
        await fetch(
            `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
        );

    return await response.json();
}

export async function searchMedia(query) {

    const response =
        await fetch(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
        );

    return await response.json();
}

export async function getDetails(id, type) {

    const response =
        await fetch(
            `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
        );

    return await response.json();
}