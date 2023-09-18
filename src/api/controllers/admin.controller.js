const Admin = require("../../models/admin.model");
const bcrypt = require("../../libs/bcrypt");
const jwt = require("../../libs/jwt");
const { generateHash, comparePass } = require("../../libs/bcrypt");
const adminValidation = require("../validations/admin.validation");
const CustomError = require("../../libs/customError");
const categoryValidation = require("../validations/category.validation");
const Category = require("../../models/category.model");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validationError = adminValidation({
      username,
      password,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const generate = await generateHash(password);
    const findAdmin = await Admin.findAll(
      { where: { username: username } },
      { logging: false }
      );
      if (findAdmin.length > 0) {
        throw new CustomError(409, "Admin already exists");
      }
      
      const newAdmin = await Admin.create(
        {
        username,
        password: generate,
      },
      { logging: false }
      );
    const token = jwt.sign({ id: newAdmin.id });

    res.cookie("token", token);

    res
      .status(201)
      .json({ message: `Succesfully created admin`, token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validationError = adminValidation({
      username,
      password,
    });
    if (validationError) throw new CustomError(400, validationError.message);
    const findAdmin = await Admin.findAll({
      where: { username: username },
      loggingIn: false,
    });

    if (!findAdmin.length) {
      throw new CustomError(404, "Admin not found");
    }

    const compare = await comparePass(password, findAdmin[0].password);
    if (!compare) {
      throw new CustomError(404, "Passwords do not match");
    }
    const token = jwt.sign({ id: findAdmin[0].id });

    res.cookie("token", token);

    res.status(201).json({ message: `Welcome`, token: token });
  } catch (error) {
    next(error);
  }
};

const categoryCreate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const validationError = categoryValidation({
      name,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const findCategory = await Category.findAll(
      { where: { name }, logging: false  }
    );
    if (findCategory.length > 0) {
      throw new CustomError(404, "Category not found");
    }

    const newCategory = await Category.create({ name, admin_id: req.user }, { logging: false });
    res.status(201).json({ message: "succes", newCategory });
  } catch (error) {
    next(error);
  }
};

const getCategory = async(req, res, next) => {
  try {
    const category = await Category.findAll()
    if(category.length < 1) throw new CustomError(404, "Category not found");

    res.status(200).json({ message: "SUCCES", category });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, categoryCreate, getCategory };
