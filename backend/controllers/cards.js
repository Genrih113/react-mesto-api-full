const Card = require('../models/card');
const { sendError, setOrFailError } = require('../helpers/error-handling-helpers');

const entityType = 'card';

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => sendError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => sendError(err, res));
};

const deleteCard = (req, res) => {
  if (req.params.cardId == req.user._id) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail(() => setOrFailError(entityType))
      .then((card) => res.send(card))
      .catch((err) => sendError(err, res));
  } else {
    res.status(403).send({message: 'Недостаточно прав'});
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => setOrFailError(entityType))
    .then((card) => res.send(card))
    .catch((err) => sendError(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => setOrFailError(entityType))
    .then((card) => res.send(card))
    .catch((err) => sendError(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
