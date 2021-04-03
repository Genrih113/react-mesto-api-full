const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { celebrateForCreateCard, celebrateForIdCheck } = require('../middlewares/joi-request-schemas');

router.get('/', getCards);
router.post('/', celebrateForCreateCard, createCard);
router.delete('/:id', celebrateForIdCheck, deleteCard);
router.put('/:id/likes', celebrateForIdCheck, likeCard); //  поставить лайк карточке
router.delete('/:id/likes', celebrateForIdCheck, dislikeCard); //  убрать лайк с карточки

module.exports = router;
