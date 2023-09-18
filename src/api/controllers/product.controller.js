const create = async (req, res, next) => {
  try {
    const { image, info, name, price, brand } = req.body;

    
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
