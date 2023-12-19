const { orders, order_products, basket_products, products} = require("../models/")
const ApiError = require('../error/ApiError');

class OrderController {
    // ------ CRUD корзины ------ //

    async addOrder(req, res, next){
        try {
            let newOrder = {
                userId: req.body.id ,
                phone: req.body.phone,
                postcode: req.body.postcode,
                addressee: req.body.addressee
            }

            const basket = await basket_products.findAll({where: {basketId: req.body.id}})

            if (basket.length >= 1)
            {
                const order = await orders.create(newOrder)
                    basket.forEach(i =>
                    order_products.create({
                        orderId: order.id,
                        productId: i.productId,
                        basketId: i.id,
                    }),
                    await basket_products.destroy({where: {basketId: req.body.id}})
                )
                // res.status(201).json(order)
            }
            // res.status(404)
            // console.log("haven't products")
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async getAll(req,res, next){
        try {
            const order = await orders.findAll()
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async getUserOrder(req,res, next){
        try {
            const {id} = req.params
            const date = await orders.findAll({where: {userId: id}} )
            // delete the dot and everything after
            return res.json(date)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }
    async getUserOrderList(req,res, next){
        try {
            const {id} = req.params
            const date = await orders.findOne( {where: {id: id}})
            const a =  await order_products.findAll({include: {
                    model: products
                }, where: {orderId: id}});
            return res.json(a)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }
    async updateUserOrder(req,res, next){
        try {
            const {_id,_status} = req.params
            const product = await orders.update(
                {status: _status},
                {where: {id: _id}}
            )
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const orderId = req.params.id;

            const order = await orders.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: "orders not found" });
            }

            await order_products.destroy({ where: { orderId } });
            await orders.destroy({ where: { id: orderId } });

            res.status(200).json({ message: "orders deleted successfully" });
        } catch (error) {
            // console.error("Error deleting order:", error);
            // res.status(500).json({ message: "Internal Server Error" });

            next(ApiError.badRequest(e.message))  // middleware error => next
        }
    }
}

module.exports = new OrderController()