import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._brands = []
        this._categories = []
        this._products = []
        this._legals = []
        this._baskets = []
        this._orders = []
        this._orders_lists = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedCategory = {}
        this._selectedLegal = {}
        this._selectedOrder = 0
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }
    setCategories(categories) {
        this._categories = categories
    }

    setLegals(legals) {
        this._legals= legals
    }

    setProducts(products) {
        this._products = products
    }

    setBaskets(basket){
        this._baskets = basket
    }

    setOrders(order){
        this._orders = order
    }

    setOrdersList(order){
        this._orders_lists = order
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    SetSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }

    setSelectedOrder(order) {
        this._selectedOrder = order
    }

    
    setSelectedLegal(legal) {
        this._selectedLegal = legal
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get categories() {
        return this._categories
    }

    get products() {
        return this._products
    }

    get basket() {
        return this._baskets
    }
    get order() {
        return this._orders
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedOrder() {
        return this._selectedOrder
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedLegal() {
        return this._selectedLegal
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get legals() {
        return this._legals
    }
    get selectedOrder() {
        return this._selectedOrder
    }
    get orders_lists() {
        return this._orders_lists
    }
}
