const Admin = require("./admin.route");
const User = require("./user.route");
const Product = require("./product.route");
const Seller = require("./seller.route");
const Category = require("./category.route");

module.exports = [Admin, User, Product, Seller, Category];
