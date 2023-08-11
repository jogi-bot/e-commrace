const { DataTypes } = require("sequelize");
const sequelize = require("./sequlize");
const User = require("./users");
const OrderDetail = require("./order");
const dataTypes = require("sequelize/lib/data-types");

const Cartmodel = sequelize.define("cart_items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userid: {
    type: dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },    
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Cartmodel.belongsTo(User, { foreignKey: "userid" });

module.exports = Cartmodel;
