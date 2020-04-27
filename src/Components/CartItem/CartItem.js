import React, {Component} from 'react'
import './CarItem.css'
import Cart from '../Cart/Cart'
import axios from 'axios'

class CartItem extends Component {
    constructor() {
        super()
        this.state = {
            qty: 1,
            total: ''
        }
    }



    componentDidMount() {
        this.setState({total: this.props.element.price})
    }

    handleAmountIncrease = () => {
        this.setState((prevState) => {
            return {
                qty: prevState.qty + 1
            }
        })
        this.props.calculateTotal(+this.props.element.price)
    }

    // handleAmountDecrease = () => {
    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty - 1
    //         }
    //     })
    //     this.props.calculateTotal(+this.props.element.price * -1)
    // }

    handleAmountDecrease = () => {
        if(this.state.qty > 1) {
            this.setState((prevState) => {
            return {
                qty: prevState.qty - 1
            }
        })
        } 
        this.props.calculateTotal(+this.props.element.price * -1)
    }

    getTotal = () => {
        this.setState({
            // qty: this.state.qty,
            total: this.state.qty * this.props.element.price
        })
    }

    updateIncrement = async () => {
       await this.handleAmountIncrease()
        this.getTotal()
    }

    updateDecrement = async () => {
        await this.handleAmountDecrease()
        this.getTotal()
    }

    deleteCartItem = (id) => {
        axios.delete(`/api/cart-item/${id}`)
        .then(() => this.props.getCart())
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.qty)
        console.log(this.props.element)
        console.log('price', this.props.element.price)
        console.log('total', this.state.total)
        const {element} = this.props

        return (
                <div className='item-list'>
                    <div className='item-image-container'>
                        <img src={element.image} alt='cart item image' width='150' />
                        <p className='element-name'>{element.name}</p>
                    </div>
                    <div className='item-price-container'>
                        <p className='price'>${element.price}</p>
                    </div>
                    <div className='qty-container'>
                        <button className='minus' onClick={this.updateDecrement}>
							-
						</button>
                        <div className='qty'>{this.state.qty}</div>
                        <button className='add' onClick={this.updateIncrement}>
							+
						</button>
                    </div>
                    <div className='total'>
                        <div className='price'>${this.state.total}</div>
                    </div>
                    <div className='delete-item-button-container'>
                        <button className='delete-item-button' onClick={() => this.deleteCartItem(this.props.element.cart_item_id)}>Delete</button>
                    </div>
                </div>
        )
    }
}

export default CartItem