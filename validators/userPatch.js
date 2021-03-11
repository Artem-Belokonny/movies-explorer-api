const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const userPatch = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Недопустимый Email');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  },
});

module.exports = userPatch;
