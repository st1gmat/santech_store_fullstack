const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo, BasketProduct, OrderProduct} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require('fs').promises;

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, legalId, amount, country, categoryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, brandId, typeId, img: fileName, legalId, amount, country, categoryId});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setDescription(req, res, next) {
        try {
            let {_id,text} = req.body
           const product = await Product.update(
                {_info: text},
                {where: {id: _id}}
            );
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try{
            let {typeId, brandId, categoryId, limit, page} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            let products;
            if (!brandId && !typeId && !categoryId) {
                products = await Product.findAndCountAll({limit, offset})
            }
            if (!brandId && !typeId && categoryId) {
                products = await Product.findAndCountAll({where:{categoryId},limit, offset})
            }

            if (brandId && !typeId && categoryId) {
                products = await Product.findAndCountAll({where:{brandId, categoryId}, limit, offset})
            }
            if (brandId && !typeId && !categoryId) {
                products = await Product.findAndCountAll({where:{brandId}, limit, offset})
            }

            if (!brandId && typeId && categoryId) {
                products = await Product.findAndCountAll({where:{typeId, categoryId}, limit, offset})
            }
            if (!brandId && typeId && !categoryId) {
                products = await Product.findAndCountAll({where:{typeId}, limit, offset})
            }

            if (brandId && typeId && categoryId) {
                products = await Product.findAndCountAll({where:{typeId, brandId, categoryId}, limit, offset})
            }
            if (brandId && typeId && !categoryId) {
                products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
            return res.json(products)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }

    async delOne(req, res) {
        const {id} = req.params
        const product = await Product.update(
            {amount: '0'},
            {where: {id: id}}
        )
        return res.json(product)
    }
    
    async updated(req, res) {
        const {_id,_amount} = req.body
        const product = await Product.update(
            {amount: _amount},
            {where: {id: _id}}
        )
        return res.json(product)
    }

    async fullDelete(req, res, next) {
        const { id } = req.params;
    
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                return next(ApiError.notFound('Product not found'));
            }
    
            await ProductInfo.destroy({ where: { productId: id } });
            await BasketProduct.destroy({ where: { productId: id } });
            await OrderProduct.destroy({ where: { productId: id } });

            await Product.destroy({ where: { id } });

            const imagePath = path.resolve(__dirname, '..', 'static', product.img);
            await fs.unlink(imagePath);

            return res.json({ message: 'Product and related records deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAbsAll(req, res, next) {
        try {
          const products = await Product.findAll({
            include: [{ model: ProductInfo, as: 'info' }],
          });
    
          return res.json(products);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new ProductController()
