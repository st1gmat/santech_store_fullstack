const { products, basket_products, baskets } = require("../models/")
const ApiError = require('../error/ApiError');

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req, res, next) {
        const user = req.user;
        // const { productId, quantity } = req.body;
        const { productId } = req.body;

        const basket = await basket_products.create({
            basketId: user.id,
            productId: productId,
            // quantity: quantity || 1, // если quantity не передан, устанавливаем значение по умолчанию 1
        });
    
        return res.json(basket);
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await basket_products.findAll({include: {
                model: products
            }, where: {basketId: id}})
        if(!basket) res.status(400).json('None Id')
        return res.json(basket)
    }

    async deleteBasket (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await basket_products.destroy({where: {id: id}})
        res.status(200).json('products deleted')
    }

}

module.exports = new BasketController()