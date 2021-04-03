const { Joi, celebrate } = require('celebrate');

const celebrateForSignin = celebrate({
  body: Joi.object().keys({
    email:
      Joi
        .string()
        .required()
        .email()
        .messages({
          'string.email': 'не корректный адрес почты',
          'string.empty': 'не указан адрес почты',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .messages({
          'string.empty': 'не введен пароль',
          'string.min': 'пароль должен состоять из не менее чем 4 символов',
        }),
  }).unknown(true),
});

const celebrateForSignup = celebrate({
  body: Joi.object().keys({
    email:
      Joi
        .string()
        .required()
        .email()
        .messages({
          'string.email': 'не корректный адрес почты',
          'string.empty': 'не указан адрес почты',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .messages({
          'string.empty': 'не введен пароль',
          'string.min': 'пароль должен состоять из не менее чем 4 символов',
        }),
    name:
      Joi
        .string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'имя должно состоять из не менее чем 2 символов',
          'string.max': 'имя должно состоять из не более чем 30 символов',
        }),
    about:
      Joi
        .string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'информация о себе должна состоять из не менее чем 2 символов',
          'string.max': 'информация о себе должна состоять из не более чем 30 символов',
        }),
    avatar:
      Joi
        .string()
        .regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/)
        .message('не корректный адрес ссылки на аватарку'),
  }).unknown(true),
});

const celebrateForUpdateProfile = celebrate({
  body: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.empty': 'не введено имя пользователя',
          'string.min': 'имя должно состоять из не менее чем 2 символов',
          'string.max': 'имя должно состоять из не более чем 30 символов',
        }),
    about:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.empty': 'не введена информация о себе',
          'string.min': 'информация о себе должна состоять из не менее чем 2 символов',
          'string.max': 'информация о себе должна состоять из не более чем 30 символов',
        }),
  }),
});

const celebrateForUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar:
      Joi
        .string()
        // .required()
        .regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/)
        .message('не корректный адрес ссылки на аватарку'),
    // .messages({
    //   'string.empty': 'не введена ссылка на аватарку',
    //   'string.match': 'не корректный адрес ссылки на аватарку',
    // не знаю каким ключом поменять текст ошибки для регулярки
    // }),
  }),
});

const celebrateForCreateCard = celebrate({
  body: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.empty': 'не введено название',
          'string.min': 'название должно состоять из не менее чем 2 символов',
          'string.max': 'название должно состоять из не более чем 30 символов',
        }),
    link:
      Joi
        .string()
        // .required()
        .regex(/^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/)
        .message('не корректный адрес ссылки на картинку'),
    // .messages({
    //   'string.empty': 'не введена ссылка на картинку',
    //   'any.required': 'не корректный адрес ссылки на картинку',
    // }),
  }),
});

const celebrateForIdCheck = celebrate({
  params: Joi.object().keys({
    id:
      Joi
        .string()
        .hex()
        .length(24)
        .messages({
          'string.hex': 'id должно состоять из 24 hex-символов',
          'string.length': 'id должно состоять из 24 hex-символов',
        }),
  }).unknown(true),
});

module.exports = {
  celebrateForSignin,
  celebrateForSignup,
  celebrateForUpdateProfile,
  celebrateForUpdateAvatar,
  celebrateForCreateCard,
  celebrateForIdCheck,
};
