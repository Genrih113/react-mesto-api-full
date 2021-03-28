const Card = require('../models/card');
const { sendError, setCustomErrorStatusAndMessage } = require('../helpers/error-handling-helpers');

//const entityType = 'card';

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

/*
const deleteCard = (req, res) => {
  if (req.params.cardId === req.user._id) {
    Card.findByIdAndRemove(req.params.cardId)
      .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти карточку'))
      .then((card) => res.send(card))
      .catch((err) => sendError(err, res));
  } else {
    //res.status(403).send({message: 'Недостаточно прав'});
    try {setCustomErrorStatusAndMessage(403, 'Недостаточно прав')}
    catch (err) {sendError(err, res)}
  }
};
*/

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти карточку'))
    .then((card) => {
      console.log(`req.user._id: ${req.user._id}`);
      console.log(`card.owner: ${card.owner}`);
      if (JSON.stringify(req.user._id) === JSON.stringify(card.owner)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => res.send(card))
      } else {
        try {setCustomErrorStatusAndMessage(403, 'Недостаточно прав')}
        catch (err) {next(err)}
      }
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти карточку'))
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => setCustomErrorStatusAndMessage(404, 'Не удалось найти карточку'))
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
