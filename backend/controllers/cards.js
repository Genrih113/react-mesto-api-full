const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

const cardNotFoundMessage = 'Не удалось найти карточку';
const permissionDenied = 'Недостаточно прав';
const incorrectIdMessage = 'Введен не корректный идентификатор';

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
  Card.findById(req.params.id)
    .orFail(() => { throw new NotFoundError(cardNotFoundMessage); })
    .then((card) => {
      if (JSON.stringify(req.user._id) === JSON.stringify(card.owner)) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: 'карточка удалена' }));
      } else {
        throw new ForbiddenError(permissionDenied);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(incorrectIdMessage));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError(cardNotFoundMessage); })
    .then(() => res.send({ message: 'лайк поставлен' }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(incorrectIdMessage));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new NotFoundError(cardNotFoundMessage); })
    .then(() => res.send({ message: 'лайк снят' }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(incorrectIdMessage));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
