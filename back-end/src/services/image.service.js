require('dotenv/config');
const { products } = require('../database/models');

const getImage = async (urlImage) => {
  const image = await products.findOne({ where: { urlImage } });
  if (!image) {
    const e = new Error('Image not found');
    e.name = 'NotFoundError';
    throw e;
  }

  return image.urlImage;
};

module.exports = {
  getImage,
  };
