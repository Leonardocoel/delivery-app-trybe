  const Joi = require('joi');

  const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const newUser = Joi.object({
      email: Joi.string().regex(regexEmail).required(),
      password: Joi.string().min(6).required(),
  });
  
  const validateUser = (req, res, next) => {
      const { email, password } = req.body;
      const { error } = newUser.validate({ email, password });
      if (error) {
          if (error.details[0].type === 'string.pattern.base') {
            const e = new Error('"email" must be a valid email'); 
            e.name = 'ValidationError';
            throw e; 
}
          if (error.details[0].type === 'any.required') {
            const e = new Error(error.details[0].message); 
            e.name = 'ValidationError';
            throw e;
          }
          const e = new Error(error.details[0].message);
          e.name = 'ValidationError';
          throw e;
      }
  
      next();
  };
  
  module.exports = {
      validateUser,
  };

module.exports = {
  validateUser,
};