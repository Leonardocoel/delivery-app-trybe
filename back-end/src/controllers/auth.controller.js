const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try { 
    const token = await authService.validateCredentials( email, password );
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    login, 
  };