const imageService = require('../services/image.service');

const imageController = async (req, res, next) => {
 const { path } = req.path;
  try { 
    const imageProduct = await imageService.getImage(path);
    return res.status(201).json(imageProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  imageController, 
  };