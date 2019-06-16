const Joi = require('joi');

const loginValidation = {
    email: Joi.string().email().required(),
    psw: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
};

const signupValidation = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).regex(/^[a-zA-Z0-9]/).required(),
  confirmPsw : Joi.string().required().valid(Joi.ref('password')),

};



module.exports = {
  loginValidation,
  signupValidation
}
