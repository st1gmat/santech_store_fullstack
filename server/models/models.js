const sequelize = require('../db')
const {DataTypes} = require('sequelize')
let Lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING,},
    lastName: {type: DataTypes.STRING,},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING,  allowNull: false},
    postcode: {type: DataTypes.STRING, allowNull: false},
    addressee: {type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.INTEGER, defaultValue: 1}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    _info:{type: DataTypes.TEXT, defaultValue: Lorem},
    amount:{type: DataTypes.INTEGER, allowNull: false},
    country:{type: DataTypes.STRING, allowNull: false},

})


const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});


const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Legal = sequelize.define('legal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    legal_p: {type: DataTypes.STRING,  allowNull: false},
    descr: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING},
    located: {type: DataTypes.STRING,  allowNull: false},
    bill: {type: DataTypes.STRING,  allowNull: false},
    inn: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.STRING, allowNull: false},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Order.hasOne(User);
User.belongsTo(Order);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Category.hasMany(Product);
Product.belongsTo(Category);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);
Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Legal.hasMany(Product);
Product.belongsTo(Legal);

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)


module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Brand,
    ProductInfo,
    Order,
    OrderProduct,
    Legal,
    Review,
    Category
}
