const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products", (req, res) => {
  console.log(req.query.category);
  
  const apiData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/public/api.json"), "utf8")
  );

  const products = apiData.products.filter(
    (product) => product.categoryId === req.query.category
  );

  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
