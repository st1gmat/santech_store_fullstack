
const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.delete('/:id', checkRole('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)

module.exports = router
