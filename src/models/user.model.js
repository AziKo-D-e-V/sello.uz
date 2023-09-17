const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Users extends Model {}

Users.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = Users;
