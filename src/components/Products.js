import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addToCartItems } from '../actions/productsAction';
import FadeLoader from 'react-spinners/FadeLoader';
// import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/type';
const Products = ({ products, addToCartItems, cartItems }) => {
  console.log(cartItems);
  if (products.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center'
        }}
      >
        <FadeLoader />
      </div>
    );
  } else {
    const productsItems = products.map(item => {
      return (
        <div key={item.id} className="trumbnail text-center">
          <a href={`#${item.id}`}>
            <div className="aBlock">
              <img src={`/products/${item.sku}_2.jpg`} alt={item.title} />
              <p>{item.title}</p>
            </div>
          </a>
          <div className="price">${item.price}</div>
          <button
            className="btn btn-primary cartButton"
            onClick={() => addToCartItems(item, cartItems)}
          >
            Add to card
          </button>
        </div>
      );
    });
    return <div className="item">{productsItems}</div>;
  }
};
const mapStateToProps = state => ({
  products:
    state.products.filteredBySize.length !== 0
      ? state.products.filteredBySize
      : state.products.product,
  cartItems: state.cartItem.cartItems
});

export default connect(
  mapStateToProps,
  { addToCartItems }
)(Products);
