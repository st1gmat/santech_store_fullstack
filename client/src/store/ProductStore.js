import {makeAutoObservable} from 'mobx';

export default class ProductStore {
    constructor() {
        this._types = [
            {
                id: 2,
                name: "Смесители"
            },
            {
                id: 3,
                name: "Раковины"
            },
            {
                id: 4,
                name: "Ванны"
            },
            {
                id: 5,
                name: "Аксессуары"
            }
        ]
        this._brands = [
            {
                id: 1,
                name: "Grohe"
            },
            {
                id: 2,
                name: "Santeri"
            },
            {
                id: 3,
                name: "Geberit"
            }
              
        ]
        this._products = [
            {
                id: 1,
                name: "GROHE Euroeco Special",
                pric: 18950,
                rating: 0,
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 5,
                name: "Geberit HyTronic",
                price: 39040,
                rating: 0,
                // img: "60e8f740-f45a-4830-a1f1-b46c36c8c12f.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 6,
                name: "Geberit Brenta",
                price: 46206,
                rating: 0,
                // img: "60e8f740-f45a-4830-a1f1-b46c36c8c12f.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            {
                id: 7,
                name: "GROHE Minta",
                price: 41790,
                rating: 0,
                // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
                img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
            },
            
        ]

        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setProdcuts(products) {
        this._products = products
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

}