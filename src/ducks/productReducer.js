const initialState = {
    products: [],
    product: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
export function getProducts(productsObj) {
    return {
        type: GET_PRODUCTS,
        payload: productsObj
    }
}

export function getOneProduct(productObj) {
    return {
        type: GET_ONE_PRODUCT,
        payload: productObj
    }
}


export default function productReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case GET_PRODUCTS:
            return {...state, products: payload};
        case GET_ONE_PRODUCT:
            console.log(payload[0])
            return {...state, product: payload[0]};
        default:
            return state
    }
}