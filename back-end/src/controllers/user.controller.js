const userService = require('../services/user.service');

const getUsersByRole = async (req, res, next) => {
  const { role } = req.params;
  try { 
    const users = await userService.getAll(role);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
   getUsersByRole, 
  };