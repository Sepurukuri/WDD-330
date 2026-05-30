import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");

order.init();

// Calculate totals when zip code changes
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// Handle checkout button click
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.forms["checkout"];

  const isValid = form.checkValidity();

  if (!isValid) {
    form.reportValidity();
    return;
  }

  order.checkout();
});