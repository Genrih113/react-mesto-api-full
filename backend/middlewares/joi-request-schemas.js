const { Joi, celebrate } = require('celebrate');

const celebrateForSign = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }).unknown(true)
})

// вроде можно обойтись одной ф-ей и на регистрацию и на вход
// const celebrateForSignin = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(4),
//   }).unknown(true)
// })

const celebrateForUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  })
})

const celebrateForUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  })
})

const celebrateForCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  })
})

module.exports = {
  celebrateForSign,
  celebrateForUpdateProfile,
  celebrateForUpdateAvatar,
  celebrateForCreateCard
}