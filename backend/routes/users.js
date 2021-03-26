const router = require('express').Router();
const {
  getUsers,
  getProfile,
  //createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getProfile);
//  router.post('/', createUser); //  этот роут заменен подобным в app.js
router.patch('/me', updateProfile); //  обновляет профиль
router.patch('/me/avatar', updateAvatar); //  обновляет аватар

module.exports = router;
