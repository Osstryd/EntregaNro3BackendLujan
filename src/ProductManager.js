const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  addProduct(product) {
    let products = this.getProductsFromFile();
    product.id = this.generateNextId(products);
    products.push(product);
    this.saveProductsToFile(products);
    console.log("Producto agregado correctamente.");
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    let products = this.getProductsFromFile();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProductsToFile(products);
      console.log("Producto actualizado correctamente.");
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    let products = this.getProductsFromFile();
    const updatedProducts = products.filter((product) => product.id !== id);
    this.saveProductsToFile(updatedProducts);
    console.log("Producto eliminado correctamente.");
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo, devuelve un array vacío
      return [];
    }
  }

  saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.filePath, data, "utf8"); // Cambio realizado aquí
  }

  generateNextId(products) {
    return products.length > 0
      ? Math.max(...products.map((product) => product.id)) + 1
      : 1;
  }
}

module.exports = ProductManager; // Agrega esta línea para exportar la clase

// Ejemplo de uso:
const productManager = new ProductManager("products.json");

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 10.99,
  thumbnail: "ruta/de/imagen1.jpg",
  code: "001",
  stock: 100,
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 20.49,
  thumbnail: "ruta/de/imagen2.jpg",
  code: "002",
  stock: 50,
});

console.log("Todos los productos:", productManager.getProducts());

const productIdToFind = 1;
console.log(
  "Producto encontrado:",
  productManager.getProductById(productIdToFind)
);

const productIdToUpdate = 2;
productManager.updateProduct(productIdToUpdate, { price: 25.99 });
console.log(
  "Producto actualizado:",
  productManager.getProductById(productIdToUpdate)
);

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
console.log(
  "Todos los productos después de eliminar:",
  productManager.getProducts()
);
