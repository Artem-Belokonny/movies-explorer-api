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
      'any.required': 'Не заполнено обязательное поле email',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Не заполнено обязательное поле name',
      }),
  },
});

module.exports = userPatch;
