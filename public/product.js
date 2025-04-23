import { initModel } from "./model.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const getProductTemplate = (product) => {
  const productTemplate = document.createElement("template");
  productTemplate.innerHTML = `
        <div class="product" data-product-id="${product.id}" data-product-category="${product.category.id}">${product.name}</div>
    `;
  return productTemplate;
};

initModel().then((model) => {
  const product = model.products.find((product) => product.id === productId);
  const productTemplate = getProductTemplate(product);
  const productElement = productTemplate.content.cloneNode(true);

  document.body.appendChild(productElement);
});
