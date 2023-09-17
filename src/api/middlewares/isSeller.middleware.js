const CustomError = require("../../libs/customError");
const { verify } = require("../../libs/jwt");
const Sellers = require("../../models/seller.model");

const isSeller = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { id } = verify(token);

    const findSeller = await Sellers.findByPk(id, { logging: false });

    if (findSeller == null) throw new CustomError(403, "Permission denied");

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isSeller;
