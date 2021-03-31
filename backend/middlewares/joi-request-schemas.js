const { Joi, celebrate } = require('celebrate');

const celebrateForSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }).unknown(true),
});

const celebrateForSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/),
  }).unknown(true),
});

const celebrateForUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const celebrateForUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/),
  }),
});

const celebrateForCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/),
  }),
});

module.exports = {
  celebrateForSignin,
  celebrateForSignup,
  celebrateForUpdateProfile,
  celebrateForUpdateAvatar,
  celebrateForCreateCard,
};
