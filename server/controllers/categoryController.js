const {Category, Product} = require('../models/models');


class CategoryController {
    async create(req, res) {
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async delete(req, res) {
        const { id } = req.params;
        
        // пытаемся найти тип по идентификатору
        const category = await Category.findByPk(id);
        
        if (!category) {
            return ApiError.badRequest('category not found');
        }

        await category.destroy();

        // обновляем все записи в таблице products, у которых typeId равен удаляемому бренду
        await Product.update({ categoryId: null }, { where: { categoryId: id } });

        return res.json({ message: 'category deleted' });
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

}

module.exports = new CategoryController()
