import { createStore, combineReducers} from 'redux';

import reducer from './reducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
    user: reducer,
    products: productReducer
})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())