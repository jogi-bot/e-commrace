const joi = require('joi')



const validationRegister = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(255).required(),
});


  const validationLogin = joi.object({
   
    email: joi.string().email().required(),
    password: joi.string().min(8).max(255).required(),
  });

  const validationCart = joi.object({
    userid: joi.number().min(1).required(),
    item: joi.string().required(),
    amount:joi.number().min(6).required(),
  })



  module.exports = {
    validationRegister,
    validationLogin,
    validationCart,
  }