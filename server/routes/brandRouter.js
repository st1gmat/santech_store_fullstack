const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

// Маршрут для создания бренда
router.post('/', checkRole('ADMIN'), brandController.create);

// Маршрут для удаления бренда по идентификатору
router.delete('/:id', checkRole('ADMIN'), brandController.delete);

// Маршрут для получения всех брендов
router.get('/', brandController.getAll);

module.exports = router