const uuid = require('uuid')
const path = require('path');
const {products, product_infos, basket_products, order_products} = require('../models/')
const ApiError = require('../error/ApiError');
const { log } = require('console');
const fs = require('fs').promises;

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, legalId, amount, country, categoryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await products.create({name, price, brandId, typeId, img: fileName, legalId, amount, country, categoryId});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    product_infos.create({
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
           const product = await products.update(
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
            console.log(`${typeId}, ${brandId}, ${categoryId}, ${limit}, ${page}`)
            let offset = page * limit - limit
            let exactProducts;
            if (!brandId && !typeId && !categoryId) {
                exactProducts = await products.findAndCountAll({limit, offset})
            }
            if (!brandId && !typeId && categoryId) {
                exactProducts = await products.findAndCountAll({where:{categoryId},limit, offset})
            }

            if (brandId && !typeId && categoryId) {
                exactProducts = await products.findAndCountAll({where:{brandId, categoryId}, limit, offset})
            }
            if (brandId && !typeId && !categoryId) {
                exactProducts = await products.findAndCountAll({where:{brandId}, limit, offset})
            }

            if (!brandId && typeId && categoryId) {
                exactProducts = await products.findAndCountAll({where:{typeId, categoryId}, limit, offset})
            }
            if (!brandId && typeId && !categoryId) {
                exactProducts = await products.findAndCountAll({where:{typeId}, limit, offset})
            }

            if (brandId && typeId && categoryId) {
                exactProducts = await products.findAndCountAll({where:{typeId, brandId, categoryId}, limit, offset})
            }
            if (brandId && typeId && !categoryId) {
                exactProducts = await products.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
            return res.json(exactProducts)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try{
            const {id} = req.params
            const product = await products.findOne(
                {
                    where: {id},
                    include: [{model: product_infos, as: 'info'}]
                },
            )
            return res.json(product)
        } catch(e) {
            console.error(error);
        }
       
    }

    async delOne(req, res) {
        try{
            const {id} = req.params
            const product = await products.update(
                {amount: '0'},
                {where: {id: id}}
            )
            return res.json(product)
        } catch(e) {
            console.error(error);
        }
    }
    
    async updated(req, res) {
        try{
            const {_id,_amount} = req.body
            const product = await products.update(
                {amount: _amount},
                {where: {id: _id}}
            )
            return res.json(product)
        } catch(e) {
            console.error(error);
        }
    }

    async fullDelete(req, res, next) {
        const { id } = req.params;
    
        try {
            const product = await products.findByPk(id);

            if (!product) {
                return next(ApiError.notFound('products not found'));
            }
    
            await product_infos.destroy({ where: { productId: id } });
            await basket_products.destroy({ where: { productId: id } });
            await order_products.destroy({ where: { productId: id } });

            await products.destroy({ where: { id } });

            const imagePath = path.resolve(__dirname, '..', 'static', product.img);
            await fs.unlink(imagePath);

            return res.json({ message: 'products and related records deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAbsAll(req, res, next) {
        try {
          const allProducts = await products.findAll({
            include: [{ model: product_infos, as: 'info' }],
          });
    
          return res.json(allProducts);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
}

module.exports = new ProductController()
