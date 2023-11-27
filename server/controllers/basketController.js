const { Product, BasketProduct, Basket } = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {productId} = req.body
        const basket = await BasketProduct.create({basketId : user.id, productId : productId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketProduct.findAll({include: {
                model: Product
            }, where: {basketId: id}})
        if(!basket) res.status(400).json('None Id')
        return res.json(basket)
    }

    async deleteBasket (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await BasketProduct.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }

}

module.exports = new BasketController()