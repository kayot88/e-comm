import {
  FETCH_DATA,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  FILTER_BY_SIZE,
  FILTER_BY_SORT
} from '../constants/type';

export const fetchProducts = () => dispatch => {
  fetch('http://localhost:8000/products/')
    .then(res => {
      return res.json();
    })
    .then(data => {
      return dispatch({
        type: FETCH_DATA,
        payload: data
      });
    })
    .catch(error => console.log(error));
};

export const filterSize = (size, products) => dispatch => {
  console.log(size, products);
  return dispatch({
    type: FILTER_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ''
          ? products
          : products.filter(
              item => item.availableSizes.indexOf(size.toUpperCase()) >= 0
            )
    }
  });
};

export const orderByPrice = (order, items, filteredItems) => dispatch => {
  const products = items.slice();
  const filterdProducts = filteredItems.slice();
  filterdProducts.length === 0
    ? order !== ''
      ? products.sort((a, b) => {
          return order === 'lowest'
            ? a.price < b.price
              ? -1
              : 1
            : a.price > b.price
            ? -1
            : 1;
        })
      : products.sort((a, b) => (a.id < b.id ? 1 : -1))
    : order !== ''
    ? filterdProducts.sort((a, b) => {
        return order === 'lowest'
          ? a.price < b.price
            ? -1
            : 1
          : a.price > b.price
          ? -1
          : 1;
      })
    : filterdProducts.sort((a, b) => (a.id < b.id ? 1 : -1));
  return dispatch({
    type: FILTER_BY_SORT,
    payload: {
      order,
      filterdProducts,
      items: products,
    }
  });
};

export const addToCartItems = (item, cartItems) => dispatch => {
      let productAllreadyInCartItems = false;
      cartItems.forEach(cart => {
        if (cart.id === item.id) {
          productAllreadyInCartItems = true;
          return cart.count++;
        }
      });
      if (!productAllreadyInCartItems) {
        return cartItems.push({ ...item, count: 1 });
      }
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return dispatch({
    type: ADD_TO_CART,
    payload: cartItems
  });
}

