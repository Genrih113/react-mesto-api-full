const User = require('../models/user');
const { sendError, setOrFailError } = require('../helpers/error-handling-helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const entityType = 'user';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => sendError(err, res));
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then((user) => res.send(user))
        .catch((err) => sendError(err, res));
    })
    // .orFail(() => setOrFailError(entityType))
    // с этой строкой крашится при отправке некорр данных

};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, about }, { new: true, runValidators: true })
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { avatar }, { new: true, runValidators: true })
    .orFail(() => setOrFailError(entityType))
    .then((user) => res.send(user))
    .catch((err) => sendError(err, res));
};

const login = (req, res) => {
  const {email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('нет юзера');
        return Promise.reject(new Error('Неправильные почта или пароль_user'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль_matched'));
          }
          const token = jwt.sign({_id: user._id}, 'some-secret-key', {expiresIn: '7d'});
          res.send({token});
        })
    })
    .catch((err) => {
      res.status(401).send({message: err.message});
    })
}

const getCurrentUser =(req, res) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Произошла чудовищная ошибка'));
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(401).send({message: err.message});
    })
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
