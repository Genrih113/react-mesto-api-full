const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard); //  поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard); //  убрать лайк с карточки

module.exports = router;
