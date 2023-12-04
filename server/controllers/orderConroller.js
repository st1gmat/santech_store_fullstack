const { Order, OrderProduct, BasketProduct, Product} = require("../models/models")

class OrderController {
    // ------ CRUD корзины ------ //

    async addOrder(req,res,next){

        let newOrder = {
            userId: req.body.id ,
            phone: req.body.phone,
            postcode: req.body.postcode,
            addressee: req.body.addressee
        }

        const basket = await BasketProduct.findAll({where: {basketId: req.body.id}})

        if (basket.length >= 1)
        {
            const order = await Order.create(newOrder)
                basket.forEach(i =>
                OrderProduct.create({
                    orderId: order.id,
                    productId: i.productId,
                    basketId: i.id,
                }),
            await BasketProduct.destroy({where: {basketId: req.body.id}})
        )
            res.status(201).json(order)
    }
        res.status(404)
        console.log("haven't products")
    }

    async getAll(req,res){
        const order = await Order.findAll()
        return res.json(order)
    }

    async getUserOrder(req,res){
        const {id} = req.params
        const date = await Order.findAll({where: {userId: id}} )
          // delete the dot and everything after
        return res.json(date)
    }
    async getUserOrderList(req,res){
        const {id} = req.params
        const date = await Order.findOne( {where: {id: id}})
        const a =  await OrderProduct.findAll({include: {
                model: Product
            }, where: {orderId: id}});
        return res.json(a)
    }
    async updateUserOrder(req,res){
        const {_id,_status} = req.params
        const product = await Order.update(
            {status: _status},
            {where: {id: _id}}
        )
        return res.json(product)
    }

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;

            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            await OrderProduct.destroy({ where: { orderId } });
            await Order.destroy({ where: { id: orderId } });

            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = new OrderController()