const {types, products} = require('../models/');


class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await types.create({name})
        return res.json(type)
    }

    async delete(req, res) {
        const { id } = req.params;
        
        // пытаемся найти тип по идентификатору
        const type = await types.findByPk(id);
        
        if (!type) {
            return ApiError.badRequest('type not found');
        }

        await type.destroy();

        // обновляем все записи в таблице products, у которых typeId равен удаляемому бренду
        await products.update({ typeId: null }, { where: { typeId: id } });

        return res.json({ message: 'type deleted' });
    }

    async getAll(req, res) {
        const allTypes = await types.findAll()
        return res.json(allTypes)
    }
    async getOne(req, res) {
        const { id } = req.params;

        try {
            const type = await types.findByPk(id);

            if (!type) {
                return ApiError.badRequest('type not found');
            }

            return res.json(type);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new TypeController()
