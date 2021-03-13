const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const deleteMovie = celebrate({
  params: {
    movieId: Joi.string().custom((value, helper) => {
      if (validator.isMongoId(value)) {
        return value;
      }
      return helper.message('Неверный ID фильма');
    }),
  },
});

module.exports = deleteMovie;
