
const Product  = require("../models/product"); // Your Sequelize models

const buyProduct = async (req, res) => {
  try {
   

    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient product quantity" });
    }

    
    product.quantity -= quantity;
    await product.save();

    res.status(200).json({ message: "Product purchased successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error purchasing product", err });
  }
};

const sellProduct = async (req, res) => {
  try {
  

    const {  name	,group_id	,quantity } = req.body;

   const newProduct =  await Product.create({
    name:name,
    group_id:group_id,
    quantity:quantity

   })
    res.status(200).json({ message: "Product add successfully", product:newProduct });
  } catch (err) {
    res.status(500).json({ error: "Error selling product", err });
  }
};

module.exports = { buyProduct, sellProduct };
