import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/type';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems'))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems
      };
    default:
      return state;
  }
};
