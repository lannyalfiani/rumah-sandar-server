const { ClassCategory } = require("../models");

class categoryController {
  static async getCategories(req, res, next) {
    try {
      let categories = await ClassCategory.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = categoryController;
