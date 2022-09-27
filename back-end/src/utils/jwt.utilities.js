require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const senha = fs.readFileSync('jwt.evaluation.key');

const createToken = (user) => {
  const token = jwt.sign({ data: user }, senha, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const e = new Error('Token not found');
    e.name = 'Unauthorized';
    throw e;
  }
  try {
    const { data } = jwt.verify(authorization, senha);
    req.user = data;

    next();
  } catch (error) {
    const e = new Error('Expired or invalid token');
    e.name = 'Unauthorized';
    throw e;
  }
};

const verifyAccessPrivileges = (req, _res, next) => {
  const { user } = req;

  if (user.role !== 'administrator') {
    const e = new Error('Access forbidden');
    e.name = 'Unauthorized';
    throw e;
  }
  next();
};

const verifySeller = (req, _res, next) => {
  const { user } = req;

  if (user.role !== 'seller') {
    const e = new Error('Access forbidden');
    e.name = 'Unauthorized';
    throw e;
  }
  next();
};
module.exports = {
  createToken,
  verifyToken,
  verifyAccessPrivileges,
  verifySeller,
};
