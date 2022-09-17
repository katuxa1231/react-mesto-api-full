const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validationModel, validationParam } = require('../constants/validation');

router.get('', getCards);
router.post('', celebrate({
  body: {
    name: validationModel.card.name,
    link: validationModel.card.link,
  },
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: {
    cardId: validationParam.id,
  },
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: {
    cardId: validationParam.id,
  },
}), dislikeCard);
router.delete('/:cardId', celebrate({
  params: {
    cardId: validationParam.id,
  },
}), deleteCard);

module.exports = router;
