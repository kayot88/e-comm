import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import {
  fetchProducts,
  filterSize,
  addToCartItems
} from './actions/productsAction';
import store from './store';

import Products from './components/Products';
import Filter from './components/Filter';
import Buckets from './components/Buckets';
import './App.css';
class App extends Component {
  state = {
    products: [],
    filteredProducts: [],
    size: '',
    // sort: '',
    uniqueSize: [],
    cartItems: []
  };
  setCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    return cartItems;
  };

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(cart => {
        return cart.id !== product.id;
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  componentWillMount() {
    this.props.fetchProducts();
    this.setCartItems();
  }

  render() {
    console.log(this.props.cartItems);
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Ecommerce Shopping Cart</h1>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <Filter
                uniqueSize={this.state.uniqueSize}
                count={this.state.filteredProducts.length}
              />
              <Products handledAddToCart={this.cartItems} />
            </div>
            <Buckets
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            >
              Buckets
            </Buckets>
          </div>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  size: state.products.size,
  filteredProducts: state.products.filteredBySize,
  cartItems: state.cartItem.cartItems
});

export default connect(
  mapStateToProps,
  { fetchProducts, filterSize, addToCartItems }
)(App);
