const User = require('../models/user');
const { setCustomErrorStatusAndMessage } = require('../helpers/error-handling-helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const userNotFoundMessage = 'Не удалось найти пользователя';
const incorrectEmailOrPasswordMessage = 'Неправильные почта или пароль';
//const tokenSignatureKey = 'some-secret-key';
const tokenSignatureKey = (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => setCustomErrorStatusAndMessage(404, userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        //  .then((user) => res.send(user)) //  тут незачем возвращать пользователя (1рев.)
        .then(() => res.send({message: 'пользователь создан'}))
        .catch((err) => next(err));
      })
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const {email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        setCustomErrorStatusAndMessage(401, incorrectEmailOrPasswordMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            setCustomErrorStatusAndMessage(401, incorrectEmailOrPasswordMessage);
          }
          const token = jwt.sign({_id: user._id}, tokenSignatureKey, {expiresIn: '7d'});
          res.send({token});
        })
    })
    .catch((err) => next(err));
}

const getCurrentUser =(req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        setCustomErrorStatusAndMessage(404, userNotFoundMessage);
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
