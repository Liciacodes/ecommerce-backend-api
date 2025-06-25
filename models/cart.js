const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalQty: 0, totalPrice: 0 };

      if (!err) {
        try {
          const parsedCart = JSON.parse(fileContent);
          cart.products = parsedCart.products || [];
          cart.totalQty = parsedCart.totalQty || 0;
          cart.totalPrice = parsedCart.totalPrice || 0;
        } catch (e) {
          console.error("Error parsing cart.json. Using default cart.");
        }
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      cart.totalQty += 1;
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) console.log("Error saving cart:", err);
      });
    });
  }
};








































// const fs = require("fs");
// const path = require("path");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "cart.json"
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalQty: 0 , totalPrice: 0};
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       // Analyze the cart => Find existing product
//       const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product / increase quantity
//       if (existingProduct) {
//         // Increase quantity
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products]
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products =[...cart.products, updatedProduct]
//       }
//       cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
//      fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       })
//     });

//     // Save the cart
//   }
// };
