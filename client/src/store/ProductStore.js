import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._brands = []
        this._products = []
        this._legals = []
        this._baskets = []
        this._orders = []
        this._orders_lists = []
        this._selectedType = {}
        this._selectedBrand = {}
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
}
