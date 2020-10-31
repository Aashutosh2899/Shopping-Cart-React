import React from 'react';
import Products from './components/Products';
import data from "./data.json";
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products : data.products ,
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort:"",
    };
  }
  createOrder = (order) => {
    alert("Your Order is Placed "  + order.name);
  }
  removeCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems:cartItems.filter(x=>x._id !== product._id)});
    localStorage.setItem("cartItems" , JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let addedInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        addedInCart = true;
      }
    });
      if (!addedInCart){
        cartItems.push({...product , count: 1 });
      }
    this.setState({cartItems});
    localStorage.setItem("cartItems" , JSON.stringify(cartItems));
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState( (state) => ({
      sort:sort,
      products: this.state.products.slice().sort( (a,b) => ( 
        sort === "lowest" ?
        ((a.price>b.price)?1:-1):
        sort === "highest" ?
        ((a.price<b.price)?1:-1):
        ((a._id>b._id)?1:-1)
      ) )
      
    }));

  }
  filterProducts = (event) => {
    if (event.target.value === "" ) {
      this.setState({ size:event.target.value , products:data.products });
    } else {
    this.setState({
      size: event.target.value,
      products : data.products.filter((product) => product.availableSizes.indexOf(event.target.value)>=0),
    });
  }
  }
  render() {

  return (
    <div className="grid-container">
      <header className="heading">
        <a href="/">FynTune Shopping Cart </a>
      </header>
      <main>
        <div className="content">
          <div className="main">
             <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
             />
             <Products products={this.state.products} addCart={this.addToCart}/>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems} removeItem={this.removeCart} createOrder={this.createOrder}/>
          </div>
        </div>
      </main>
      <footer>
        All Rights Reserved
      </footer>  
    </div>
  );
  }
}

export default App;
