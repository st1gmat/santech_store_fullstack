const {Type, Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async delete(req, res) {
        const { id } = req.params;
        
        // пытаемся найти тип по идентификатору
        const type = await Type.findByPk(id);
        
        if (!type) {
            return ApiError.badRequest('Type not found');
        }

        await type.destroy();

        // обновляем все записи в таблице products, у которых typeId равен удаляемому бренду
        await Product.update({ typeId: null }, { where: { typeId: id } });

        return res.json({ message: 'Type deleted' });
    }


    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()