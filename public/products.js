import { initProducts } from "./model.js";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

const initModel = async () => {
  const response = await fetch("/api/products?category=" + selectedCategory);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  window.model = await response.json();
  return window.model;
};

initModel().then((model) => {
  console.log({ model });
});
