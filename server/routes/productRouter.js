const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), productController.create)
router.post('/update',checkRole('ADMIN'), productController.setDescription)
router.get('/', productController.getAll)
router.get('/all', productController.getAbsAll)
router.get('/:id', productController.getOne)

router.post('/update/:id',checkRole('ADMIN'), productController.updated)
router.post('/del/:id',checkRole('ADMIN'), productController.delOne)
router.delete('/:id',checkRole('ADMIN'), productController.fullDelete)


module.exports = router