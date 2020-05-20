import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getOneProduct} from '../../ducks/productReducer'
import {getUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import './ProductDetail.css'


class ProductDetail extends Component {
    constructor() {
        super()
        this.state = {

        }
    }



    // componentDidMount = () => {
    //     axios.get(`/api/products/${this.props.match.params.category}/${this.props.match.params.id}`)
    //     .then(res => {
    //         console.log(res.data)
    //         this.props.getOneProduct(res.data)
    //     })
    //     .catch(err => console.log(err))
    // }

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
        axios.get(`/api/products/${this.props.match.params.category}/${this.props.match.params.id}`)
        .then(res => {
            console.log(res.data)
            this.props.getOneProduct(res.data)
        })
        .catch(err => console.log(err))
    }

    addToCart = () => {
        if(this.props.user.email) {
            const {product_id, price} = this.props.product
            // console.log()
            axios.post('/api/cart-item', {cart_id: this.props.user.cart_id, product_id, price})
            .then(() => {
                window.alert('Item added to cart')
                console.log(this.product_id)
            })
            .catch(err => console.log(err))
        }   else {
            alert('Please Login')
        }
    }

    render() {
        console.log(this.props.user)
        console.log(this.props.product)
        return (
            <div>
                {!this.props.user.email ?
                (
                <div>
                    <header className='product-detail-header'>
                    <div>
                        <Link className='chairs' to='/products/chair'>Chairs</Link>
                        <Link className='beds' to='/products/bed'>Beds</Link>
                        <Link className='tables' to='/products/table'>Tables</Link>
                    </div>
                    <div>
                        <Link className='detail-logo' to='/'>Modern</Link>
                    </div>
                    <div>
                        <Link className='login' to='/login'>Login</Link>
                    </div>
                    </header>
                    <div className='product-body'>
                        <div className='product-image-container'>
                            <img width='400' alt='product' src={this.props.product.sub_image_one} className='image1' />
                            <img width='400' alt='product2' src={this.props.product.sub_image_two} className='image2' />
                            <img width='400' alt='product3' src={this.props.product.sub_image_three} className='image3' />
                        </div>
                        <div className='product-info'>
                            <div className='product-info-container'>
                                <div className='product-name'>{this.props.product.name}</div>
                                <br/>
                                <div className='product-price'>${this.props.product.price}</div>
                                <p className='product-description'>{this.props.product.description}</p>
                                <br />
                                <button onClick={() => this.addToCart(this.props.product.price, this.props.product.product_id)} className='add-to-bag-button'>ADD TO BAG</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
                :
                (
                    <div>
                    <header className='product-detail-header'>
                    <div>
                        <Link className='chairs' to='/products/chair'>Chairs</Link>
                        <Link className='beds' to='/products/bed'>Beds</Link>
                        <Link className='tables' to='/products/table'>Tables</Link>
                    </div>
                    <div>
                        <Link className='detail-logo' to='/'>Modern</Link>
                    </div>
                    <div>
                        <Link to='/cart'>
                            <div className='cart-icon'></div>
                        </Link>
                        <Link className='login' to='/login'>Logout</Link>
                    </div>
                    </header>
                    <div className='product-body'>
                        <div className='product-image-container'>
                            <img width='400' alt='product' src={this.props.product.sub_image_one} className='image1' />
                            <img width='400' alt='product2' src={this.props.product.sub_image_two} className='image2' />
                            <img width='400' alt='product3' src={this.props.product.sub_image_three} className='image3' />
                        </div>
                        <div className='product-info'>
                            <div className='product-info-container'>
                                <div className='product-name'>{this.props.product.name}</div>
                                <br/>
                                <div className='product-price'>${this.props.product.price}</div>
                                <p className='product-description'>{this.props.product.description}</p>
                                <br />
                                <button onClick={() => this.addToCart(this.props.product.price, this.props.product.product_id)} className='add-to-bag-button'>ADD TO BAG</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {product} = reduxState.products
    const {user} = reduxState.user
    return {product, user}
}



export default connect(mapStateToProps, {getOneProduct, getUser})(ProductDetail)