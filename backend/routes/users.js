const router = require('express').Router();
const {
  getUsers,
  getProfile,
  //createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');
const { celebrateForUpdateProfile, celebrateForUpdateAvatar } = require('../middlewares/joi-request-schemas');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getProfile);
//  router.post('/', createUser); //  этот роут заменен подобным в app.js
router.patch('/me', celebrateForUpdateProfile, updateProfile); //  обновляет профиль
router.patch('/me/avatar', celebrateForUpdateAvatar, updateAvatar); //  обновляет аватар

module.exports = router;
