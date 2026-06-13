import {
  renderMovieGrid,
  getFavorites,
} from "./movieCard.mjs";

const grid = document.querySelector("#favoritesGrid");

function loadFavoritesPage() {
  const favorites = getFavorites();

  renderMovieGrid(grid, favorites);
}

loadFavoritesPage();