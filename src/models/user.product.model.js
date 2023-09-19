const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/index");

class UserProduct extends Model {}

UserProduct.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "userproducts",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = UserProduct;
