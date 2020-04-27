const initialState = {
    // user: {cart_id: 2, customer_id: 2, email: 'test@test.com', paid: false},
    user: {}
}

const GET_USER = 'GET_USER'

const UPDATE_CART = 'UPDATE_CART'


export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export function updateCart(num) {
    return {
        type: UPDATE_CART,
        payload: num
    }
}


export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case GET_USER:
            return {...state, user: payload};
        case UPDATE_CART:
            return {...state, cart_id: payload}
        default:
            return state
    }
}