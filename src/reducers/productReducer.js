import { FETCH_DATA, FILTER_BY_SIZE, FILTER_BY_SORT } from '../constants/type';

const initialState = {
  product: [],
  size:'',
  order:'',
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
    default:
      return state;
  }
};
