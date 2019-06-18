const Joi = require("joi");

const validate = validateCheck => (req, res, next) => {
  console.log("this is req.body:", req.body);
  const validateStatus = Joi.validate(req.body, validateCheck, {
    abortEarly: false
  });

  if (validateStatus.error)
    res
      .status(200)
      .json({ err: validateStatus.error.details.map(error => error.message) });
  else next();
};

module.exports = validate;
