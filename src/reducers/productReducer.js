import {
  FETCH_DATA,
  FILTER_BY_SIZE,
  FILTER_BY_SORT,
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../constants/type';

const initialState = {
  product: [],
  size:'',
  order:'',
  // count: 0,
  cartItems: [],
  filteredBySize: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        product: action.payload
      };
    case FILTER_BY_SIZE:
      return {
        ...state,
        filteredBySize: action.payload.items,
        size: action.payload.size
      };
    case FILTER_BY_SORT:
      return {
        ...state,
        product: action.payload.items,
        order: action.payload.order,
        filteredBySize: action.payload.filterdProducts
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload 
      };
    default:
      return state;
  }
};
