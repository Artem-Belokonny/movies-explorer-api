const router = require('express').Router();
const controller = require('../controllers/users');
const userPatchValidator = require('../validators/userPatch');

router.get('/me', controller.getUserInfo);
router.patch('/me', userPatchValidator, controller.updateUser);

module.exports = router;
