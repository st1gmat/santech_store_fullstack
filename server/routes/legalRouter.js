const Router = require('express')
const router = new Router()
const legalController = require("../controllers/legalController")
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require('../middleware/checkRoleMiddleware')



router.post('/new', legalController.create)
router.delete('/:id', legalController.delete)
router.get('/', legalController.showAll)
router.get('/:id', legalController.show)

module.exports = router