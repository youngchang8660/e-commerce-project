import React, { Component } from "react";
import Header from "../Header/Header";
import {Link} from 'react-router-dom'
import "./Landing.css";
import Sliders from '../Sliders/Sliders'
import axios from "axios";

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      images: [
        'https://images.unsplash.com/photo-1543589365-3cc63c87243f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        // 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        // 'https://images.unsplash.com/photo-1491926626787-62db157af940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
      ],
      text: {
        recipient: '',
        textmessage: 'Thank you for subscribing'
      },
      finalRecipient: false
    }
  }

  toggleFn = () => {
    this.setState({
      finalRecipient: !this.state.finalRecipient
    })
  }

  sendText = async () => {
    const {text} = this.state
    await axios.post(`/api/text/${text.recipient}`)
    .then(res => {
      console.log(res.data)
      this.toggleFn()
    })
    .catch(err => console.log(err))
  }



  render() {
    // console.log(this.state.images)
    console.log(this.state.text.recipient)
    console.log(this.state.finalRecipient)
    return (
      <div className='body'>
        <Header />
        <Sliders slides={this.state.images} autoPlay={7} />
        {/* <div className='landing-body'></div> */}
        <div className='body-two-container'>
          <div className='body-two'>
            <h2>Shop Our Products</h2>
          </div>
        </div>
        <div className='images-container'>
          <div className='landing-chair-image-container'>
            <div className='landing-chair-image'>
                <Link to='/products/chair' className='shop-chair-button'>Shop Chairs</Link>
            </div>
          </div>
            <div className='landing-bed-table-container'>
              <div className='landing-bed-image-container'>
                <div className='landing-bed-image'>
                  <Link to='/products/bed' className='shop-bed-button' >Shop Beds</Link>
                </div>
              </div>
                <div className='landing-table-image-container'>
                  <div className='landing-table-image'>
                    <Link to='/products/table' className='shop-table-button'>Shop Tables</Link>
                  </div>
                </div>
            </div>
        </div>
        <div className='body-three-container'>
          <div className='body-three-one'>
            <div className='airplane'></div>
            <p className='body-three-text'>FREE SHIPPING ON ALL ORDERS IN THE UNITED STATES</p>
          </div>
          <div className='body-three-two'>
            <div className='return'></div>
            <p className='body-three-text'>FREE RETURNS</p>
          </div>
          <div className='body-three-three'>
            <div className='security'></div>
            <p className='body-three-text'>100% SECURE CHECKOUT</p>
          </div>
        </div>
        <div className='body-four-container'>
          <div className='body-four-left'>
            <div className='quote-container'>
              <p className='quote'>FURNITURE must have personality as well as be beautiful.</p>
            </div>
          </div>
          <div className='body-four-right'></div>
        </div>
        <div>
          {!this.state.finalRecipient 
          ?
          (
            <footer className='footer'>
            <div className='footer-container'>
            <Link className='footer-logo' to='/'>MODERN</Link>
            </div>
            <div className='email-input-container'>
              <input 
                className='email-input' 
                placeholder='Your phone number' 
                value={this.state.text.recipient} 
                onChange={e => this.setState({text: {...this.state.text, recipient: e.target.value}})}
              />
            </div>
              <button className='email-button' onClick={this.sendText}>Subscribe →</button>
            </footer>
          ):(
            <footer className='footer'>
            <div className='footer-container'>
            <Link className='footer-logo' to='/'>MODERN</Link>
            </div>
            <div className='subscription-container'>
              <h2 className='subscription-text'>Thanks for subscribing</h2>
            </div>
            </footer>
          )
          }
        </div>
      </div>
    );
  }
}



export default Landing;
