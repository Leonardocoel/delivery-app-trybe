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

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, senha);
    return decoded;
  } catch (error) {
    const e = new Error('expired or invalid token');
    e.name = 'Unauthorized';
    throw e;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
