const path = require("path");
const {Legal, Product} = require("../models/models");
const ApiError = require("../error/ApiError");

class LegalController {
    async create(req, res, next) {
        try {
            let {name, legal_p, descr, type, phone, located, bill, inn, comment} = req.body


            const product = await Legal.create({name, legal_p, descr, type, located, bill, inn, comment, phone});
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async show(req, res, next) {
        try {
            let {id} = req.body
            const product = await Legal.findOne(id);
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        
        const legal = await Legal.findByPk(id);
        
        if (!brand) {
            return ApiError.badRequest('Brand not found');
        }

        await legal.destroy();

        await Product.update({ legallId: null }, { where: { legallId: id } });

        return res.json({ message: 'Legal deleted' });
    }



    async showAll(req, res) {
        const legal = await Legal.findAll();
        return res.json(legal)

    }

}
    module.exports = new LegalController()