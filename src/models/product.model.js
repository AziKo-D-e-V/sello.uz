const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = Products;
