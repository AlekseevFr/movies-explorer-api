const router = require('express').Router();

const { getActiveUser } = require('../controllers/getActiveUser');
const { updateUser } = require('../controllers/users');
const { updateUserValid } = require('../validators/updateUserValid');

router.get('/me', getActiveUser);
router.patch('/me', updateUserValid, updateUser);

module.exports = router;
