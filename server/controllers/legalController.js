const path = require("path");
const {legals, products} = require("../models/");
const ApiError = require("../error/ApiError");

class LegalController {
    async create(req, res, next) {
        try {
            let {name, legal_p, descr, type, phone, located, bill, inn, comment} = req.body


            const product = await legals.create({name, legal_p, descr, type, located, bill, inn, comment, phone});
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async show(req, res, next) {
        try {
            let {id} = req.body
            const product = await legals.findOne(id);
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            const legal = await legals.findByPk(id);
            
            if (!brand) {
                return ApiError.badRequest('Brand not found');
            }

            await legal.destroy();

            await products.update({ legallId: null }, { where: { legallId: id } });

            return res.json({ message: 'legals deleted' });
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }



    async showAll(req, res, next) {
        try {

            const legal = await legals.findAll();
            return res.json(legal)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

}

module.exports = new LegalController()