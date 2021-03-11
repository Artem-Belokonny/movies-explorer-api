const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const auth = celebrate({
  body: {
    password: Joi.string().min(2).required().messages({
      'any.required': 'Обязательное поле',
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Недопустимый Email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

module.exports = auth;
