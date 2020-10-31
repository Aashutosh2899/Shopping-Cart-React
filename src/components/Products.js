import React, { Component } from 'react';
import Fade from "react-reveal/Flash";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product: null,
        };
    }
    openModal = (product) => {
        this.setState({product});
    };
    closeModal = () => {
        this.setState({product:null});
    }
    render() {
        const {product} = this.state;
        return (
            <div>
                <Fade bottom cascade>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-name">
                                        <p>
                                            {product.title}
                                        </p>
                                    </div>
                                </a>   
                                <div className="product-price">
                                    <div>
                                       Price : ₹ {product.price}
                                    </div>   
                                </div>  
                                <div className="add">
                                    <button onClick={ () => this.props.addCart(product)} className="button primary" >
                                            Add To Cart 
                                    </button> 
                                </div>
                                 
                            </div>
                        </li>

                    ))}
                </ul>   
                </Fade> 
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}></img>
                                <div className="product-detail-description">
                                    <p className="modal-title">
                                        {product.title}
                                    </p>
                                    <p className="modal-description">
                                        {product.description}
                                    </p>
                                    <p>
                                        Available Sizes :
                                        {product.availableSizes.map((x => 
                                          <span>
                                              {" "}
                                        <span>{x},</span>
                                          </span>    
                                        ))}
                                    </p>
                                    <div className="price-modal">
                                        <div className="modal-price">Price : ₹ {product.price}</div>
                                        <button className="button primary modal-btn" onClick={()=>{
                                            this.props.addCart(product);
                                            this.closeModal();
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}
