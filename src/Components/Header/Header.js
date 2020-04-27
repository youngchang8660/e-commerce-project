import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import axios from 'axios'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    handleButtonClick = () => {
        this.setState(state => {
          return {
            open: !state.open,
          };
        });
      };

    // toggle = () => {
    //     this.setState({
    //         dropDownBar: !this.state.dropDownBar
    //     })
    // }

    handleLogout = () => {
        axios.get('/auth/logout')
        .then((res) => {
            this.props.getUser(res.data);
            this.props.history.push('/login')
        })
        .catch(err => console.log(err))
    }
    

    render() {
        console.log('user', this.props.store.user)
        return (
            <div>
                {!this.props.store.user.user.email
                ?
                (
                    <header className='header'>
                    <div className='logo-box'>
                        <Link className='header-logo' to='/'>
                            MODERN
                        </Link>
                    </div>
                    <div className='menus'>
                        <div className="menu-container">
                            <div type="button" class="button" onClick={this.handleButtonClick}>
                                <div className='shop-button'>Shop</div>
                            </div>
                            {this.state.open && (
                            <div class="dropdown">
                                <Link className='dropdown-list' to='/products/chair'>Chairs</Link>
                                <Link className='dropdown-list' to='/products/bed'>Beds</Link>
                                <Link className='dropdown-list' to='/products/table'>Tables</Link>
                            </div>
                            )}
                        </div>
                        <Link className='cart' to='/login'>Cart</Link>
                        <Link className='login' to='/login'>Login</Link>
                    </div>
                    </header>
                )
                :(
                    <header className='header'>
                    <div className='logo-box'>
                        <Link className='header-logo' to='/'>
                            MODERN
                        </Link>
                    </div>
                    <div className='menus'>
                    <div className="container">
                            <div type="button" class="button" onClick={this.handleButtonClick}>
                                <div className='shop-button'>Shop</div>
                            </div>
                            {this.state.open && (
                            <div class="dropdown">
                                <Link className='dropdown-list' to='/products/chair'>Chairs</Link>
                                <Link className='dropdown-list' to='/products/bed'>Beds</Link>
                                <Link className='dropdown-list' to='/products/table'>Tables</Link>
                            </div>
                            )}
                        </div>
                        <Link className='cart' to='/cart'>Cart</Link>
                        <Link className='logout' onClick={this.handleLogout} to='/login'>Logout</Link>
                    </div>
                    <div className='welcome-user-container'>
                        <p className='welcome-user'><span className='welcome'>Welcome</span> {this.props.store.user.user.email}</p>
                    </div>
                    </header>
                )}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState
    return {
        store: {
            user
        }
    }
}

export default connect(mapStateToProps, {getUser})(Header)