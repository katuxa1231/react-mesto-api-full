const Card = require('../models/card');
const NotFound = require('../errors/not-found');
const { errorMessage, StatusCode } = require('../constants/api');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new Forbidden(errorMessage[StatusCode.FORBIDDEN]);
      }

      if (card.owner.toString() !== req.user._id) {
        throw new BadRequest('Карточка может быть удалена только создателем');
      }
      card.remove()
        .then((deletedCard) => res.send(deletedCard))
        .catch(next);
    })
    .catch(next);
};
