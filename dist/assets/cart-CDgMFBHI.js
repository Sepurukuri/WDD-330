import{l as t,g as e}from"./utils-BLF6_eem.js";t();function s(){const r=e("so-cart").map(c=>o(c));document.querySelector(".product-list").innerHTML=r.join("")}function o(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
   >
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}s();
