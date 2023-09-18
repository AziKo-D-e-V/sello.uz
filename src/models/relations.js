const Admins = require("./admin.model");
const Category = require("./category.model");
const Products = require("./product.model");

const relations = () => {
  Admins.hasMany(Category, { foreignKey: "admin_id" });
  Category.belongsTo(Admins, { foreignKey: "admin_id" });

  Category.hasMany(Products, { foreignKey: "category_id" });
  Products.belongsTo(Category, { foreignKey: "category_id" });
};

module.exports = relations;
