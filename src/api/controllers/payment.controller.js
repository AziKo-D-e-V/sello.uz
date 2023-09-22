const config = require("config");
const { sequelize } = require("../../models/user.model");
const stripe = require("stripe")(config.get("stripe_secret_key"));
const Products = require("../../models/product.model");
const Users = require("../../models/user.model");
const Sellers = require("../../models/seller.model");
const CustomError = require("../../libs/customError");

const payment = async (req, res, next) => {
  try {
    let { amount, id, user_id } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Payment",
        payment_method: id,
        confirm: true,
        return_url: "http://localhost:3000",
      });

      const user = await Users.findOne({
        where: { id: user_id },
        logging: false,
      });
      user.balance = user?.balance + amount;

      await user.save({ logging: false });
      res.json({
        message: "Payment was successful",
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const userPayment = async (req, res, next) => {
  const { product_id } = req.params;
  const user_id = req.user;

  if (!product_id) throw new CustomError(404, "Product_id not found");

  const t = await sequelize.transaction({ logging: false });
  try {
    const user = await Users.findOne({
      where: { id: user_id },
      logging: false,
    });

    if (!user) throw new CustomError(404, "User not found");

    const product = await Products.findOne({
      where: { id: product_id },
      logging: false,
    });

    if (!product) throw new CustomError(404, "Product not found");

    if (user.balance < product.price) {
      await t.rollback({ logging: false });
      throw new CustomError(
        400,
        "Balance cannot be less than " + product.price + "."
      );
    }

    user.balance = user.balance - product.price;
    await user.save({ transaction: t, logging: false });

    const seller_id = product.seller_id;

    const seller = await Sellers.findOne({
      where: { id: seller_id },
      logging: false,
    });

    seller.balance = seller.balance + product.price;

    await seller.save({ transaction: t, logging: false });

    await t.commit({ logging: false });

    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    await t.rollback({ logging: false });
    next(error);
  }
};

module.exports = userPayment;

module.exports = {
  payment,
  userPayment,
};
