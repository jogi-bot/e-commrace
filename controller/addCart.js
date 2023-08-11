const Cartmodel = require("../models/cart");
const statusCodes = require("../easy/status_code");
const {validationCart} = require("../easy/validation");



const  Cart  = async (req, res) => {
  try {
    
    const  {userid, item , amount} =  req.body
    
     const { error }  = validationCart.validate(req.body)

if (error) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "error in validation part", error });
    }

    await Cartmodel.create({ userid, item, amount });

    res
      .status(statusCodes.SUCCESS.code)
      .json({ message: "Item added to cart successfully" });
  } catch (error) {
   return  res
      .status(statusCodes.BAD_REQUEST.code)
      .json({ error: "Error adding item to cart", error });
  }
};

module.exports = { Cart };
