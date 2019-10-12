import React from 'react';
import { connect } from 'react-redux';
import {
  filterSize,
  fetchProducts,
  orderByPrice
} from '../actions/productsAction';

const Filter = ({
  count,
  size,
  order,
  products,
  filterSize,
  orderByPrice,
  filtered
}) => {
  // console.log(products);
  const items = products;
  const filteredItems = filtered;
  return (
    <div className="row filter-wrapper">
      <div className="col-md-4">We found {count} items</div>
      <div className="col-md-4">
        <label htmlFor="itemSize">Select</label>
        <select
          name="itemSize"
          className="form-control"
          value={size}
          onChange={e => {
            filterSize(e.target.value, products);
          }}
        >
          <option value=""></option>
          <option value="M">M</option>
          <option value="S">S</option>
          <option value="X">X</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="itemSort">Order by</label>
        <select
          id="itemSort"
          name="itemSort"
          className="form-control"
          value={order}
          onChange={e => {
            return orderByPrice(e.target.value, items, filteredItems);
          }}
        >
          <option value=""></option>
          <option value="lowest">Lowest to highest</option>
          <option value="highest">Highest to lowest</option>
        </select>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  products: state.products.product,
  size: state.products.size,
  order: state.products.order,
  filtered: state.products.filteredBySize
});

export default connect(
  mapStateToProps,
  { filterSize, fetchProducts, orderByPrice }
)(Filter);
