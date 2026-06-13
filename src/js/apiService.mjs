const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function checkApiKey() {
  if (!TMDB_API_KEY) {
    throw new Error(
      "Missing TMDB API Key. Please configure VITE_TMDB_API_KEY in your .env file."
    );
  }
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json();
}

import {
  TMDB_IMAGE_BASE,
  PLACEHOLDER_IMAGE,
} from "./constants.mjs";

export function getPosterUrl(path) {
  if (!path) {
    return PLACEHOLDER_IMAGE;
  }

  return `${TMDB_IMAGE_BASE}${path}`;
}

export async function getTrendingMovies() {
  checkApiKey();

  const url =
    `${TMDB_BASE_URL}/trending/all/week` +
    `?api_key=${TMDB_API_KEY}`;

  const data = await fetchJson(url);

  return data.results ?? [];
}

export async function searchMedia(query) {
  checkApiKey();

  if (!query || !query.trim()) {
    return [];
  }

  const url =
    `${TMDB_BASE_URL}/search/multi` +
    `?api_key=${TMDB_API_KEY}` +
    `&query=${encodeURIComponent(query)}`;

  const data = await fetchJson(url);

  return data.results ?? [];
}

export async function getGenres() {
  checkApiKey();

  const url =
    `${TMDB_BASE_URL}/genre/movie/list` +
    `?api_key=${TMDB_API_KEY}`;

  const data = await fetchJson(url);

  return data.genres ?? [];
}

export async function discoverMovies({
  genre = "",
  sortBy = "popularity.desc",
} = {}) {
  checkApiKey();

  let url =
    `${TMDB_BASE_URL}/discover/movie` +
    `?api_key=${TMDB_API_KEY}` +
    `&sort_by=${sortBy}`;

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  const data = await fetchJson(url);

  return data.results ?? [];
}

export async function getMovieDetails(movieId) {
  checkApiKey();

  const url =
    `${TMDB_BASE_URL}/movie/${movieId}` +
    `?api_key=${TMDB_API_KEY}`;

  return fetchJson(url);
}

export async function getTvDetails(tvId) {
  checkApiKey();

  const url =
    `${TMDB_BASE_URL}/tv/${tvId}` +
    `?api_key=${TMDB_API_KEY}`;

  return fetchJson(url);
}

export async function getTrailerFromTMDB(id, mediaType = "movie") {
  checkApiKey();

  const url =
    `${TMDB_BASE_URL}/${mediaType}/${id}/videos` +
    `?api_key=${TMDB_API_KEY}`;

  const data = await fetchJson(url);

  const trailer = data.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return trailer ?? null;
}

export async function searchYouTubeTrailer(title) {
  if (!YOUTUBE_API_KEY) {
    return null;
  }

  const query = encodeURIComponent(`${title} official trailer`);

  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    `?part=snippet` +
    `&maxResults=1` +
    `&q=${query}` +
    `&type=video` +
    `&key=${YOUTUBE_API_KEY}`;

  const data = await fetchJson(url);

  if (!data.items?.length) {
    return null;
  }

  return data.items[0];
}