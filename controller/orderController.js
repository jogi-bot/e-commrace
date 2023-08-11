const statusCodes = require("../easy/status_code");
const Cartmodel = require("../models/cart");

const order_details = require("../models/order");


const { Op } = require("sequelize");


const placeOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

   
   


    const cartItems = await Cartmodel.findAll({ where: { userid: userId } });

    if (!cartItems || cartItems.length == 0) {
      return res
        .status(statusCodes.NOT_FOUND.code)
        .json({ error: "data not found" });
    }

    for (const cardItem of cartItems) {
        const newOrderDetailes = {
        item: cardItem.item,
        productId:productId ,
        amount: cardItem.amount,
        userId: userId,
      };
      await order_details.create( newOrderDetailes)

      await cardItem.destroy();
    }
    return res
      .status(statusCodes.SUCCESS.code)
      .json({ message: "Order placed successfully" });
  } catch (err) {
    res
      .status(statusCodes.NOT_FOUND.code)
      .json({ error: "error in order to cart page", err });
  }
};

const threeWork = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = req.query.page || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const searchText = req.query.search;

    const whereCondition = searchText
      ? { userId, item: { [Op.like]: `%${searchText}%` } }
      : { userId };

    const orders = await order_details.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: pageSize,
    });

    const totalOrders = orders.count;

    res
      .status(statusCodes.SUCCESS.code)
      .json({ orders: orders.rows, totalOrders: totalOrders });
  } catch (err) {
    res
      .status(statusCodes.BAD_REQUEST.code)
      .json({ error: "Error fetching orders", err });
  }
};

module.exports = { placeOrder, threeWork };
