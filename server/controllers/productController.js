const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const { Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try{
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    
                    })
                )
            }
    
            const product = await Product.create({name, price, brandId, typeId, img: fileName})
    
            return res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
    
            const product = await Product.findOne({ where: { id } })
    
            if (!product) {
                return next(ApiError.badRequest("Product not found"))
            }
    
            const imagePath = path.resolve(__dirname, '..', 'static', product.img)
    
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
    
            await Product.destroy({
                where: { id },
            });
    
            return res.json({ message: "Product deleted successfully" })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }


    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit;

        let products;
        if(!brandId && !typeId){
            products = await Product.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(products)
    }
    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info' }]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductController()