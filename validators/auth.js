const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const auth = celebrate({
  body: {
    password: Joi.string().min(2).required().messages({
      'any.required': 'Не заполнено обязательное поле password',
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Недопустимый Email');
    }).messages({
      'any.required': 'Не заполнено обязательное поле email',
    }),
  },
});

module.exports = auth;
