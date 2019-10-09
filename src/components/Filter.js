import React from 'react';

const Filter = ({
  count,
  size,
  sort,
  handleChangeSize,
  handleChangeSort,
  uniqueSize
}) => {
  return (
    <div className="row filter-wrapper">
      <div className="col-md-4">We found {count} items</div>
      <div className="col-md-4">
        <label htmlFor="itemSize">Select</label>
        <select
          name="itemSize"
          className="form-control"
          value={size}
          onChange={handleChangeSize}
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
        <label htmlFor="itemSize">Order by</label>
        <select
          name="itemSort"
          className="form-control"
          value={sort}
          onChange={handleChangeSort}
        >
          <option value=""></option>
          <option value="lowest">Lowest to highest</option>
          <option value="highest">Highest to lowest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
