import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    this.list = [];
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);

    this.renderList(this.list);

    document.querySelector(".title").textContent = this.category;

    const sortElement = document.querySelector("#sortProducts");

    if (sortElement) {
      sortElement.addEventListener("change", (e) => {
        this.sortProducts(e.target.value);
        this.renderList(this.list);
      });
    }
  }

  sortProducts(sortOption) {
    switch (sortOption) {

      case "name-asc":
        this.list.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        );
        break;

      case "name-desc":
        this.list.sort((a, b) =>
          b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
        );
        break;

      case "price-asc":
        this.list.sort((a, b) =>
          a.FinalPrice - b.FinalPrice
        );
        break;

      case "price-desc":
        this.list.sort((a, b) =>
          b.FinalPrice - a.FinalPrice
        );
        break;
    }
  }

  renderList(list) {
    this.listElement.innerHTML = "";

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list
    );
  }
}
