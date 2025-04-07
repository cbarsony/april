import { initModel } from "./model.js";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

const productTemplate = document.createElement("template");
productTemplate.innerHTML = `
    <a class="category"></a>
`;

initModel()
  .then((model) => {
    model.categories.forEach((category) => {
      const productElement = productTemplate.content.cloneNode(true);
      productElement.querySelector(".category").textContent = category.name;
      productElement.querySelector(".category").href = `?category=${category.id}`;

      document.body.appendChild(productElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });

if(selectedCategory) {
    const categoryElement = document.createElement("div");
    categoryElement.textContent = `Selected Category: ${selectedCategory}`;
    document.body.appendChild(categoryElement);
}
