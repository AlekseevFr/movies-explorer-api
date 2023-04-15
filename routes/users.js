const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getActiveUser } = require('../controllers/getActiveUser');
const { updateUser } = require('../controllers/users');

router.get('/me', getActiveUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  }),
  updateUser,
);

module.exports = router;
