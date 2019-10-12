import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { fetchProducts, filterSize } from './actions/productsAction';
import store from './store';
// import gql from 'graphql-tag';

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
  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(cart => {
        return cart.id !== product.id;
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handledAddToCart = (e, item) => {
    this.setState(state => {
      const { cartItems } = state;
      console.log(state);
      let productAllreadyInCartItems = false;
      cartItems.forEach(cart => {
        console.log(this.state);
        if (cart.id === item.id) {
          productAllreadyInCartItems = true;
          return cart.count++;
        }
      });
      if (!productAllreadyInCartItems) {
        return cartItems.push({ ...item, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return cartItems;
    });
  };
  // handleChangeSize = e => {
   
  // };
  // listSize = () => {
  //   this.setState(state => {
  //     if (state.size !== '') {
  //       var filteredBySize = state.products.filter(item => {
  //         const literr = item.availableSizes;
  //         if (literr.includes(state.size)) {
  //           return item;
  //         }
  //         return filteredBySize;
  //       });
  //     } else {
  //       return { filteredProducts: state.products };
  //     }

  //     return { filteredProducts: filteredBySize };
  //   });
  // };

  // handleChangeSort = e => {
  //   this.setState(
  //     {
  //       sort: e.target.value
  //     },
  //     function() {
  //       this.listProducts();
  //     }
  //   );
  // };
  // listProducts = () => {
  //   this.setState(state => {
  //     if (state.sort !== '') {
  //       return state.filteredProducts.sort((a, b) => {
  //         return state.sort === 'lowest'
  //           ? a.price < b.price
  //             ? -1
  //             : 1
  //           : a.price > b.price
  //           ? -1
  //           : 1;
  //       });
  //     } else {
  //       return state.filteredProducts.sort((a, b) => (a.id < b.id ? 1 : -1));
  //     }
  //   });
  // };

  componentWillMount() {
    this.props.fetchProducts();
      }

  render() {
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
              <Products
                 handledAddToCart={this.handledAddToCart}
              />
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
  filteredProducts: state.products.filteredBySize
});
 
export default connect(
  mapStateToProps,
  { fetchProducts, filterSize }
)(App);