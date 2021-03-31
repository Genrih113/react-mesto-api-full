const Card = require('../models/card');
const { setCustomErrorStatusAndMessage } = require('../helpers/error-handling-helpers');

const cardNotFoundMessage = 'Не удалось найти карточку';
const permissionDenied = 'Недостаточно прав';

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => setCustomErrorStatusAndMessage(404, cardNotFoundMessage))
    .then((card) => {
      if (JSON.stringify(req.user._id) === JSON.stringify(card.owner)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardThatWasFinded) => res.send(cardThatWasFinded));
      } else {
        try {
          setCustomErrorStatusAndMessage(403, permissionDenied);
        } catch (err) {
          next(err);
        }
      }
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, cardNotFoundMessage))
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, cardNotFoundMessage))
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
