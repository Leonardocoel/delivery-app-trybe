require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const senha = fs.readFileSync('jwt.evaluation.key')

 // import secret2 from  '../jwt.evaluation.key'

const createToken = (user) => {
  const token = jwt.sign({ data: user }, senha, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

module.exports = {
  createToken,
};
