import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted =
    product.FinalPrice < product.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">

        ${
          isDiscounted
            ? `<span class="discount-badge">-${discountPercent}% OFF</span>`
            : ""
        }

        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>

        ${
          isDiscounted
            ? `
              <p class="original-price">
                $${product.SuggestedRetailPrice}
              </p>
            `
            : ""
        }

        <p class="product-card__price">
          $${product.FinalPrice}
        </p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      console.log("Category:", this.category);

      const list = await this.dataSource.getData(this.category);

      console.log("Products returned:", list);

      this.renderList(list);

      const title = document.querySelector(".title");
      if (title) {
        title.textContent = this.category;
      }
    } catch (err) {
      console.error("ProductList Error:", err);
    }
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list
    );
  }
}
