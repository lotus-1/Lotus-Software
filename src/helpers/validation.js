const Joi = require('joi');

const loginValidation = {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
};

const signupValidation = {
  username: Joi.string().required(0),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).regex(/^[a-zA-Z0-9]/).required(),
  confirmPsw : Joi.string().required(),

};


module.exports = {
  loginValidation,
  signupValidation
}
