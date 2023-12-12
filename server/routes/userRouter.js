const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/exact/:id', authMiddleware, checkRole('ADMIN'), userController.getUser);
router.get('/all', authMiddleware, checkRole('ADMIN'), userController.getAllUsers);
router.delete('/delete/:id', authMiddleware, checkRole('ADMIN'), userController.deleteUser);

module.exports = router;