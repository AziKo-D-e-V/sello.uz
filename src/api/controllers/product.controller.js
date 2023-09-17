const create = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
