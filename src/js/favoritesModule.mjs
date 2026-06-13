// src/js/favoritesModule.mjs

import { FAVORITES_KEY } from "./constants.mjs";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

export function isFavorite(id) {
  return getFavorites().some((item) => item.id === id);
}

export function toggleFavorite(movie) {
  const favorites = getFavorites();

  const index = favorites.findIndex(
    (item) => item.id === movie.id
  );

  if (index >= 0) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  }

  favorites.push(movie);
  saveFavorites(favorites);

  return true;
}