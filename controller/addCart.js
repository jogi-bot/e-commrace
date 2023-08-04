const Cart = async (req, res) => {
  try {
    const { userid } = req;

    const { item } = req.body;

    await CartItem.create({ userId, item });

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(200).json({ error: "Error adding item to cart" });
  }
};

module.exports = Cart;
