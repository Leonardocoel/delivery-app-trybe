const md5 = require('md5');
const { users } = require('../database/models');

const encryptPassword = (password) => {
  const encryption = md5(password);
  return encryption;
};

const verifyUser = async (email, password) => {
  const encryptedPassword = encryptPassword(password);

  const validUser = await users.findOne({
    where: { email, password: encryptedPassword },
    attributes: { exclude: ['id', 'password'] },
    raw: true,
  });
  
  if (!validUser) {
    const e = new Error('Invalid credentials');
    e.name = 'NotFoundError';
    throw e;
  }
  return validUser;
};

module.exports = {
  encryptPassword,
  verifyUser,
};
