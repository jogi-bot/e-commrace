"use strict";

const dataTypes = require("sequelize/lib/data-types");
const { down } = require("./20230803091754-user");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cart_items", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId:{
        type:dataTypes.INTEGER,
        allowNull:false,
        refrence:{
          model: 'users',
          key: 'id',

        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        
      },
  
      item:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      amount:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        

      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

   down: async(queryInterface, Sequelize ) => {

   await queryInterface.dropTable('cart_items')
  }
};
