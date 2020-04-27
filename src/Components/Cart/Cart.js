import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from '../Header/Header.js'
import {getUser} from '../../ducks/reducer'
import {getProducts} from '../../ducks/productReducer'
import axios from 'axios'
import './Cart.css'
import CartItem from '../CartItem/CartItem.js'
import CheckOut from '../CheckOut/CheckOut.js'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [],
            total: 0
        }
    }

    calculateTotal = (productTotalChange) => {
        console.log(productTotalChange)
        this.setState({
            total: this.state.total + productTotalChange
        })
    }

    checkUsers = () => {
        axios.get('/api/check-user')
        .then(res => {
            this.props.getUser(res.data)})
    }

    

    componentDidMount() {
        this.checkUsers()
        setTimeout(
            () => {this.getCart()}, 100
        )  
    }

    getCart = () => {
        axios.get(`/api/cart/${this.props.user.cart_id}`)
            .then(res => {
            console.log(res.data)
            this.setState({cart: res.data}, () => {
                let updatedCart = this.state.cart.map(element => (
                    {...element, qty: 1}
                ))
                this.setState({cart: updatedCart}, () => {
                    let currentTotal = 0
                    this.state.cart.forEach(item => {
                        currentTotal += +item.price
                    })
                    this.setState({
                        total: currentTotal
                    })
                })
            })})
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.cart)
    
        const mapCart = this.state.cart.map((element, index) => {
            return(
                <div>
                    <CartItem getCart={this.getCart} total={this.state.total} calculateTotal={this.calculateTotal} key={index} element={element} />
                </div>
            )
        })
        // console.log(this.props.user)
        console.log(this.props)
        return(
            <div>
                <Header />
                <div className='cart-body'>
                    <div className='cart-list'>{mapCart}</div>
                    <div className='checkout-body'>
                        <CheckOut total={this.state.total} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState.user
    const {products} = reduxState.products
    return {products, user}
}

export default connect(mapStateToProps, {getUser, getProducts})(Cart)