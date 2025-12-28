const Joi = require('joi');
const validateInput = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(32),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    dob: Joi.date().greater('1-1-1975').less('12-1-2015'),
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const passError = error.details.map((arg) => {
      return arg.message;
    });
    return res.send({ success: false, data: passError });
  }

  next();
};

module.exports = validateInput;
