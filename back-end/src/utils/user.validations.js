const Joi = require('joi');

const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
const newUser = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().regex(regexEmail).required(),
    password: Joi.string().min(6).required(),
});

const validateUserCreation = (user) => {
    const { name, email, password } = user;
    const { error } = newUser.validate({ email, password, name });
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
};

module.exports = {
    validateUserCreation,
};
