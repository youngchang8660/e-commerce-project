import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products'
import ProductDetail from './Components/Products/ProductDetail';
import Cart from './Components/Cart/Cart'

export default (
    <Switch>
        <Route exact path ='/' component={Landing} />
        <Route path='/login' component={Login} />
        <Route path='/products/:category' component={Products} />
        <Route path='/product/:category/:id' component={ProductDetail} />
        <Route path='/cart' component={Cart} />
    </Switch>
)