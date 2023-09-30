const { log } = require("console");
const fs = require("fs");
const path = require("path");

const productDataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
); // path.dirname(require.main.filename) is root directory

const getProductFromFile = (callback) => {
  fs.readFile(productDataPath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, name, image, price) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
};
