
const { DataTypes } = require('sequelize')
const sequelize = require('./sequlize')


const User = sequelize.define('users', {
    id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       allowNull:false,
       autoIncrement:true

    },
    username:{ 
        type:DataTypes.STRING,
      

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
        

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false

    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW

    }

})

module.exports = User