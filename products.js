import { initModel } from "./model.js";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

const categoryTemplate = document.createElement("template");
categoryTemplate.innerHTML = `
    <a class="category"></a>
`;

const productTemplate = document.createElement("template");
productTemplate.innerHTML = `
    <li>
        <a class="product"></a>
    </li>
    
`;

initModel()
  .then((model) => {
    model.categories.forEach((category) => {
      const categoryElement = categoryTemplate.content.cloneNode(true);
      categoryElement.querySelector(".category").textContent = category.name;
      categoryElement.querySelector(
        ".category"
      ).href = `?category=${category.id}`;

      document.body.appendChild(categoryElement);
    });

    if (selectedCategory) {
      const productListElement = document.createElement("div");
      productListElement.classList.add("product-list");

      const productLabel = document.createElement("div");
      productLabel.textContent = `Selected Category: ${selectedCategory}`;

      const productList = document.createElement("ul");

      model.products
        .filter((product) => product.category.id === selectedCategory)
        .forEach((product) => {
          const productElement = productTemplate.content.cloneNode(true);

          productElement.querySelector(".product").textContent = product.name;
          productElement.querySelector(
            ".product"
          ).href = `/product?id=${product.id}`;
          productList.appendChild(productElement);
        });

      productListElement.appendChild(productLabel);
      productListElement.appendChild(productList);
      document.body.appendChild(productListElement);
    }
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });
