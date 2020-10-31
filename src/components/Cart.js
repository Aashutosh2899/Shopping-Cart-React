import React, { Component } from 'react';
import Fade from "react-reveal/Fade";


export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            address:"",
            phone:"",
            phoneError:"",
            showCheckout : false,
            isvalid: true
         }
    }
    handleInput = (e) => {
         this.setState({ [e.target.name] : e.target.value });
    };
    createOrder = (e) => {
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };

    render() {
        const {cartItems} = this.props;
        return (
            <div>
                <div className="cart-header cart">
                        {cartItems.length === 0? ( <div>Your Cart Is Currently Empty ! </div> )
                    :  
                        ( <div>There are {cartItems.length} item in your cart {" "} </div> )
                    }
                </div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                       {cartItems.map(item => (
                          <li key={item._id}>
                             <div>
                                 <img src={item.image} alt={item.title}></img>
                             </div>         
                             <div>
                                <div className="title-class">
                                    {item.title}
                                </div> 
                                <div className="right">
                                  <span> ₹{item.price} x {item.count}{"    "}</span>
                                  <button onClick={ () => this.props.removeItem(item)} >Remove</button>
                                </div>
                             </div>    
                          </li>
                       ))}   
                    </ul>
                    </Fade>
                </div>      
                  
                {cartItems.length!==0 &&
               
                <div>
                     <Fade right cascade>
                        <div className="total">
                            <div className="final-price">
                                <span> Total :  {" "} </span>
                                <span className="price"> ₹ { cartItems.reduce((a,c) => a + c.price * c.count , 0 ) } </span>
                            </div>    
                            <div className="proceed">
                                <button onClick={ ()=> {this.setState({ showCheckout:true }) } } className="button primary">Proceed</button>
                            </div>
                        </div>
                    </Fade>
                </div>
                
                }   
                {this.state.showCheckout && (
                    <Fade right cascade>
                        <div className="cart">   
                            <form onSubmit={this.createOrder}>
                                <div className="checkout">
                                    <p>Fill in the following details to checkout :</p>
                                </div> 
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name="email" type="email" onChange={this.handleInput} required></input>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} required></input>
                                    </li>
                                    
                                    <li>
                                        <label>Phone Number</label>
                                        <input type="number" name="phone" onChange={this.handleInput} required></input>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input type="text" name="address" onChange={this.handleInput} required></input>
                                    </li>
                                    <li>
                                        <button className="button primary " type="submit"  >Checkout</button>
                                    </li>
                                </ul>
                            </form>    
                        </div>    
                    </Fade>
                )}
                        
            </div>
        )
    }
}
