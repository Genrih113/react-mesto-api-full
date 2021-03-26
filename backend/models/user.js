const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат почты'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    select: false
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: /^https?:\/\/[a-zA-Z0-9\-]{2,64}\.[a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]{2,}/,
  },
});

module.exports = mongoose.model('user', userSchema);
