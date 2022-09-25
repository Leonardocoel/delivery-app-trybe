const { AuthService } = require('../services/auth.service');

const login = async (req, res, next) => {
 const { email, password } = req.body;
  try { 
    const user = await AuthService(email, password);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    login, 
  };