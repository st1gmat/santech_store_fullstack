const Router = require('express')
const router = new Router()
const orderController = require("../controllers/orderConroller")
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', orderController.addOrder)
router.get('/', checkRole('ADMIN'),orderController.getAll)
router.get('/user/:id',  orderController.getUserOrder)
router.get('/user/update:id', checkRole('ADMIN'), orderController.updateUserOrder)
router.get('/:id', orderController.getUserOrderList)




module.exports = router