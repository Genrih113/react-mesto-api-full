const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const userNotFoundMessage = 'Не удалось найти пользователя';
const incorrectEmailOrPasswordMessage = 'Неправильные почта или пароль';
const mailHasAlreadyBeenUsed = 'Пользователь с такой почтой уже существует';
const incorrectIdMessage = 'Введен не корректный идентификатор';
const tokenSignatureKey = (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError(userNotFoundMessage); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(incorrectIdMessage));
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then(() => res.send({ message: 'пользователь создан' }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(mailHasAlreadyBeenUsed));
          }
          return next(err);
        });
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(userNotFoundMessage); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(userNotFoundMessage); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectEmailOrPasswordMessage);
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotFoundError(incorrectEmailOrPasswordMessage);
          }
          const token = jwt.sign({ _id: user._id }, tokenSignatureKey, { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
