const express = require("express");
const ProductManager = require("./ProductManager"); // Importar el ProductManager personalizado

const app = express();
const PORT = 3000;

const productManager = new ProductManager("products.json"); // Instanciar el ProductManager con su archivo

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit) {
      const products = await productManager.getAllProducts();
      res.json(products.slice(0, limit));
    } else {
      const products = await productManager.getAllProducts();
      res.json(products);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("¡Hola! Este es el servidor Express.");
});
