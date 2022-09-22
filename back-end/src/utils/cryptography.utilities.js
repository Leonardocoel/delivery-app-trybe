const md5 = require('md5');
  const { users } = require('../database/models');

 const encryptPassword = (password) => {
    const encryption = md5(password);
    return encryption;
  };

 const verifyPassword = async (email, password) => {
    const validPassword = await users.findOne({ where: { email, password } });
    if (!validPassword) {
        const e = new Error('Invalid credentials');
        e.name = 'NotFoundError';
        throw e;
      }
    return validPassword;
  };

  module.exports = {
    encryptPassword,
    verifyPassword,
  };