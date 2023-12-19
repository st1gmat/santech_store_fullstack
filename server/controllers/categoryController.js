const {categories, products} = require('../models/');
const ApiError = require('../error/ApiError');


class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const category = await categories.create({name})
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            // пытаемся найти тип по идентификатору
            const category = await categories.findByPk(id);
            
            if (!category) {
                return ApiError.badRequest('category not found');
            }

            await category.destroy();

            // обновляем все записи в таблице products, у которых typeId равен удаляемому бренду
            await products.update({ categoryId: null }, { where: { categoryId: id } });

            return res.json({ message: 'category deleted' });
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async getAll(req, res, next) {
        try {
            const allCategories = await categories.findAll()
            return res.json(allCategories)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }
    
    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const category = await Brand.findByPk(id);

            if (!category) {
                return ApiError.badRequest('category not found');
            }

            return res.json(category);
        } catch (error) {
            // console.error(error);
            // return res.status(500).json({ error: 'Internal Server Error' });
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

}

module.exports = new CategoryController()
