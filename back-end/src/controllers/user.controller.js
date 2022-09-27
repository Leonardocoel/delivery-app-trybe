const userService = require('../services/user.service');

const getAllUsers = async (_req, res, next) => {
  try { 
    const users = await userService.getAll();
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers, 
  };