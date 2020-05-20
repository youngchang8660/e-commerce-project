import React, {Component} from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import {getProducts} from '../../ducks/productReducer'
import './Products.css'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state ={

        }
    }

    checkUsers = () => {
        axios.get('/api/check-user')
        .then(res => {
            this.props.getUser(res.data)})
    }

    

    // componentDidMount() {
    //     this.checkUsers()
    //     setTimeout(
    //         () => {this.getProducts()}, 100
    //     )  
    // }

    componentDidMount = async () => {
        await this.checkUsers()
        await this.getProducts()
    }

    getProducts = () => {
        axios.get(`/api/products/${this.props.match.params.category}`)
        .then(res => {
            console.log(res.data)
            this.props.getProducts(res.data)
        })
        .catch(err => console.log(err))
    }

    handleClick = (id) => {
        this.props.history.push(`/product/${this.props.match.params.category}/${id}`)
        console.log(id)
    }
 

    render() {

        const mappedProducts = this.props.products.products.map((element, index)=> (
            <div element={element} key={index} className='product'>
                <img className='product-image' onClick={() => this.handleClick(element.product_id)} src={element.image} alt='product-image' />
                <div className='name-price-container'>
                    <p className='product-name'>{element.name}</p>
                    <p className='product-price'>${element.price}</p>
                </div>
            </div>
        ))
        console.log(this.props)
        console.log(this.props.products.products)
    return(
        <div>
            <Header />
            <div className='product-container'>
                {mappedProducts}
            </div>
        </div>
    )
}
}

// const mapStateToProps = reduxState => {
//     const {products} = reduxState
//     return {
//         store: {
//             products
//         }
//     }
// }

const mapStateToProps = reduxState => reduxState


export default connect(mapStateToProps, {getProducts, getUser})(Products)