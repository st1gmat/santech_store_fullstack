const {brands, products} = require('../models/')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
        const {name} = req.body
        const brand = await brands.create({name})
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            // пытаемся найти бренд по идентификатору
            const brand = await brands.findByPk(id);
            
            if (!brand) {
                return ApiError.badRequest('brands not found');
            }

            await brand.destroy();

            // обновляем все записи в таблице products, у которых brandId равен удаляемому бренду
            await products.update({ brandId: null }, { where: { brandId: id } });

            return res.json({ message: 'brands deleted' });
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }



    async getAll(req, res, next) {
        try {
            const allBrands = await brands.findAll()
            return res.json(allBrands)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }


    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const brand = await brands.findByPk(id);

            if (!brand) {
                return ApiError.badRequest('brands not found');
            }

            return res.json(brand);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new BrandController()
