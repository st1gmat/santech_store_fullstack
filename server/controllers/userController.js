const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users, baskets, orders, order_products} = require('../models/')

const generateJwt = (id, email, role) => {
   return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, firstName, lastName, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await users.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await users.create({email, role, firstName, lastName, password: hashPassword})
        const basket = await baskets.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        try
        {
            if(req) {
                const token = generateJwt(req.user.id, req.user.email, req.user.role)
                return res.json({token})
            }
            else {
                return req.user.role
            }
        } catch(e) {
            console.error(e);
        }
        
    }
    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await users.findByPk(id);

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            return res.json({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            });

        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Неверный токен'));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const allUsers = await users.findAll({
                attributes: ['id', 'email', 'firstName', 'lastName', 'role'],
            });

            return res.json(allUsers);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Ошибка при получении списка пользователей'));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            
            await baskets.destroy({ where: { userId: id } });

            const all_orders = await orders.findAll({ where: { userId: id } });
            for (const order of all_orders) {
                await order_products.destroy({ where: { orderId: order.id } });
                await order.destroy();
            }


            const user = await users.findByPk(id);
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
            await user.destroy();

            return res.json({ message: 'Пользователь успешно удален' });

        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Неверный токен'));
        }
    }
}

module.exports = new UserController()
