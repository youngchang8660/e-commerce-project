import React, {Component} from 'react'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import axios from 'axios'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = async () => {
        const {email, password} = this.state
        await axios.post('/auth/register', {email, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
        await axios.post(`/api/email/${this.props.store.user.user.email}`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    handleLogin = async () => {
        const {email, password} = this.state
        await axios.post('/auth/login', {email, password})
        .then(res => {
            console.log(res.data)
            this.props.getUser(res.data)
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    render() {
        // console.log('email', this.state.email)
        // console.log('password', this.state.password)
        console.log('user', this.props.store.user)
        console.log(this.props)
        return (
            <div>
                <Header user={this.props.store.user} className='login-header'/>
                <div className='login-body'>
                    <div className='customer-container'>
                        <h1 className='customer-login'>Customer <br/>Login</h1>
                    </div>
                    <div className='login-form'>
                        <div className='input-boxes'>
                            <input className='emailInput' onChange={(e) => this.handleChange(e)} name='email' placeholder='Email'/>
                            <input className='passwordInput' type='password' onChange={(e) => this.handleChange(e)} name='password' placeholder='Password' />
                        </div>
                        <div className='buttons'>
                            <button className='signIn-button' onClick={this.handleLogin}>SIGN IN</button>
                            <button className='register-button' onClick={this.handleRegister}>REGISTER</button>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, {getUser})(Login)