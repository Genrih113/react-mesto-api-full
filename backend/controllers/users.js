const User = require('../models/user');
const { sendError, setCustomErrorStatusAndMessage } = require('../helpers/error-handling-helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const entityType = 'user';
const userNotFoundMessage = 'Не удалось найти пользователя';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти пользователя'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        //.orFail(() => setCustomErrorStatusAndMessage(409, 'Пользователь с таким email уже существует'))
        .then((user) => res.send(user))
        .catch((err) => next(err));
      })
    // .orFail(() => setOrFailError(entityType))
    // с этой строкой крашится при отправке некорр данных

};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти пользователя'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти пользователя'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const {email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('нет юзера');
        setCustomErrorStatusAndMessage(401, 'Неправильные почта или пароль_user');
        //  return Promise.reject(new Error('Неправильные почта или пароль_user'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            setCustomErrorStatusAndMessage(401, 'Неправильные почта или пароль_matched');
            //  return Promise.reject(new Error('Неправильные почта или пароль_matched'));
          }
          const token = jwt.sign({_id: user._id}, 'some-secret-key', {expiresIn: '7d'});
          res.send({token});
        })
    })
    .catch((err) => next(err));
      //res.status(err.status).send({message: err.message});
      //  res.status(401).send({message: err.message});
}

const getCurrentUser =(req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        setCustomErrorStatusAndMessage(401, 'Что-то тут не то');
      }
      res.send(user);
    })
    .catch((err) => next(err));
}

module.exports = {
  getUsers,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser
};
