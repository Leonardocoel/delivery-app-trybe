const registerService = require('../services/register.service');

const register = async (req, res, next) => {
 const { username, email, password, role } = req.body;
  try { 
    await registerService.registerNewUser(username, email, password, role);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register, 
  };