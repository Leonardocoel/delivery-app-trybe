const registerService = require('../services/register.service');

const register = async (req, res, next) => {
 const { name, email, password } = req.body;

  try { 
    const user = await registerService.registerNewUser(name, email, password);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register, 
  };