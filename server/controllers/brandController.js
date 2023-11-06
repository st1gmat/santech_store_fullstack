const {Brand, Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async delete(req, res) {
        const { id } = req.params;
        
        // пытаемся найти бренд по идентификатору
        const brand = await Brand.findByPk(id);
        
        if (!brand) {
            return ApiError.badRequest('Brand not found');
        }

        await brand.destroy();

        // обновляем все записи в таблице products, у которых brandId равен удаляемому бренду
        await Product.update({ brandId: null }, { where: { brandId: id } });

        return res.json({ message: 'Brand deleted' });
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        if(!brands) {
            ApiError.badRequest("Not found!")
        }
        return res.json(brands)
    }
}

module.exports = new BrandController()