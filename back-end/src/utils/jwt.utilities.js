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
  const token = req.headers.authorization;
  const { authorization } = req.headers;
  if (!authorization) {
    const e = new Error('Token not found');
    e.name = 'Unauthorized';
    throw e;
  }
  try {
    const { data } = jwt.verify(token, senha);
    req.user = data;
    next();
  } catch (error) {
    const e = new Error('Expired or invalid token');
    e.name = 'Unauthorized';
    throw e;
  }
};

  const verifyAccessPrivileges = (req, _res, next) => {
    const token = req.headers.authorization;
    const user = jwt.decode(token);
    console.log(user);
    if (user.data.role !== 'administrator') {
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
};
