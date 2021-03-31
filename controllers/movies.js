const Movie = require('../models/movie');
const { NotFound, BadRequest, Forbidden } = require('../errors');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  const owner = req.user._id;
  Movie.findOne({ movieId, owner })
    .then((film) => {
      if (film) {
        throw new BadRequest('Фильм уже добавлен в Сохраненные фильмы');
      } else {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          movieId,
          nameRU,
          nameEN,
          thumbnail,
          owner,
        })
          .then((movie) => res.send({ data: movie }))
          .catch((err) => {
            if (err.name === 'CastError') {
              const error = new BadRequest('Необходимо указать валидные данные');
              return next(error);
            }
            return next(err);
          });
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм не найден');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new Forbidden('Нельзя удалять чужие фильмы');
      }
      Movie.findByIdAndRemove(movie.id)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Передан неверный id фильма');
        return next(error);
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
