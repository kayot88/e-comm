import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Buckets from './components/Buckets';
import './App.css';
class App extends Component {
  state = {
    products: [],
    filteredProducts: [],
    size: '',
    sort: '',
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
  handleChangeSize = e => {
    this.setState(
      {
        size: e.target.value
      },
      function() {
        this.listSize();
      }
    );
  };
  listSize = () => {
    this.setState(state => {
      if (state.size !== '') {
        var filteredBySize = state.products.filter(item => {
          const literr = item.availableSizes;
          if (literr.includes(state.size)) {
            return item;
          }
          return filteredBySize;
        });
      } else {
        return { filteredProducts: state.products };
      }

      return { filteredProducts: filteredBySize };
    });
  };

  handleChangeSort = e => {
    this.setState(
      {
        sort: e.target.value
      },
      function() {
        this.listProducts();
      }
    );
  };
  listProducts = () => {
    this.setState(state => {
      if (state.sort !== '') {
        return state.filteredProducts.sort((a, b) => {
          return state.sort === 'lowest'
            ? a.price < b.price
              ? -1
              : 1
            : a.price > b.price
            ? -1
            : 1;
        });
      } else {
        return state.filteredProducts.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
    });
  };

  componentWillMount() {
    if (localStorage.getItem('cartItems')) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      });
    }
    fetch('http://localhost:8000/products/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          products: data,
          filteredProducts: data
        });
        const tempData = data.map(item => {
          return item.availableSizes;
        });
        const uniqueArr = new Set(tempData.flat(1));
        return this.setState({
          uniqueSize: uniqueArr
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { filteredProducts } = this.state;
    return (
      <div className="container">
        <h1>Ecommerce Sopping Cart</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              uniqueSize={this.state.uniqueSize}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <Products
              products={filteredProducts}
              handledAddToCart={this.handledAddToCart}
            />
          </div>
          <Buckets cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}>Buckets</Buckets>
        </div>
      </div>
    );
  }
}

export default App;
