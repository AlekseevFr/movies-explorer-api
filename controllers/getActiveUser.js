const { Internal } = require('../errors/Internal');
const { NotFound } = require('../errors/NotFound');
const { MESSAGES } = require('../constants');
const User = require('../models/user');

async function getActiveUser(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFound(MESSAGES.NOT_FOUND));
    }
    return res.send(user);
  } catch (err) {
    return next(new Internal(MESSAGES.SERVER_ERROR));
  }
}

module.exports = { getActiveUser };
