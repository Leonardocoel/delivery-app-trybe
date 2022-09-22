const registerService = require('../services/register.service');

const register = async (req, res, next) => {
 const { name, email, password } = req.body;
  try { 
    await registerService.registerNewUser(name, email, password);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register, 
  };