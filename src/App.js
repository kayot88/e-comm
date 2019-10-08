import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import './App.css';

class App extends Component {
  state = {
    products: [],
    filteredProducts: [],
    size: '',
    sort: ''
  };

  handledAddToCart = e => {
    console.log(e.target);
  };
  handleChangeSize = e => {
    this.setState({
      size: e.target.value
    });
  };
  handleChangeSort = e => {
    this.setState({
      sort: e.target.value
    });
    this.listProducts();
  };
  listProducts = () => {
    this.setState(state => {
      if (state.sort !== '') {
        return state.products.sort((a, b) => {
          return state.sort === 'lowest'
            ? a.price < b.price
              ? -1
              : 1
            : a.price > b.price
            ? -1
            : 1;
        });
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
      return {filteredProducts: state.products}
    });
  };

  componentWillMount() {
    fetch('http://localhost:8000/products/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          products: data,
          filteredProducts: data
        });
      });
  }

  render() {
    const { products, filteredProducts } = this.state;
    return (
      <div className="container">
        <h1>Ecommerce Sopping Cart</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <Products
              products={filteredProducts}
              handledAddToCart={this.handledAddToCart}
            />
          </div>
          <div className="col-md-4 buckets">Buckets</div>
        </div>
      </div>
    );
  }
}

export default App;
