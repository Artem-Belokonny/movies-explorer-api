const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createMovie = celebrate({
  body: {
    country: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле country',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле director',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Неверно заполнено обязательное поле duration',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле year',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле description',
    }),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Необходимо указать ссылку на image');
    }).messages({
      'any.required': 'Неверно указана ссылку на image',
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Необходимо указать ссылку на trailer');
    }).messages({
      'any.required': 'Неверно указана ссылку на trailer',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле nameRU',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Неверно заполнено обязательное поле nameEN',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Необходимо указать ссылку на thumbnail');
    }).messages({
      'any.required': 'Неверно указана ссылку на thumbnail',
    }),
  },
});

module.exports = createMovie;
