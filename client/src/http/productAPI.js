import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (id) => {
    const {response} = await $authHost.delete('api/type/' + id)
    return response
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (id) => {
    const {response} = await $authHost.delete('api/brand/'+ id)
    return response
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category/', category)
    return data
}

export const deleteCategory = async (id) => {
    const {response} = await $authHost.delete('api/category/'+ id)
    return response
}

export const fetchCategory = async () => {
    const {data} = await $host.get('api/category', )
    return data
}

export const fetchLegal = async () => {
    const {data} = await $host.get('api/legal', )
    return data
}

export const createLegal = async (legal) => {
    const {data} = await $host.post('api/legal/new', legal)
    return data
}

export const deleteLegal = async (id) => {
    const {response} = await $host.post('api/legal/' + id)
    return response
}


export const createProduct = async (product) => {
    const {data} = await $authHost.post('/api/product', product)
    return data
}

export const delProduct = async (id) => {
    const {data} = await $authHost.post('api/product/del/'+ id)
    return data
}

export const fullDeleteProduct = async (id) => {
    const {response} = await $authHost.delete('api/product/'+ id)
    return response
}

export const setDescription = async (_id, text) => {
    const {data} = await $authHost.post('api/product/update', _id, text)
    return data
}

export const fetchProducts = async (typeId, brandId, categoryId, page, limit) => {
    const {data} = await $host.get('api/product', {params: {
            typeId, brandId, categoryId, page, limit
        }})
    // console.log('Request parameters:', typeId, brandId, categoryId, page, limit);
    // console.log(data)
    return data
}

export const fetchAllProducts = async () => {
    const {data} = await $host.get('api/product/all', )
    return data
}


export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product' + '/'+id)
    return data
}

// ------ Корзина ------- //

export const addToBasket = async (productId) => {
    const {response} = await $authHost.post('api/basket', productId)
    return response
}

export const deleteFromBasket = async (id) => {
    const {response} = await $authHost.post('api/basket/delete', {id:id})
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}
// ------ Заказы ------- //
export const addOrder = async (id, phone, postcode, addressee) => {
    const {data} = await $host.post('api/order', {
            id, phone, postcode, addressee
        })
    return data
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get('api/order/')
    return data
}


export const getUserOrder = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/'+id, id)
    return data
}



export const getUserOrderList = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/'+id, id)
    return data
}

export const updateUserOrder = async (id, status) => {
    if(!id)id = 0;
    const {data} = await $authHost.post('api/order/update/'+id, {params:{id, status}})
    return data
}

export const updateAmount = async (_id, _amount) => {
    const {data} = await $authHost.post('api/product/update/'+_id, {_id, _amount})
    return data
}

export const deleteOrder = async (id) => {
    const {response} = await $authHost.delete('api/order/' + id);
    return response;
};