import React from 'react';

const Products = ({ products, filteredProducts, handledAddToCart }) => {
  const productsItems = products.map(item => {
    return (
      <div className="trumbnail text-center" key={item.id}>
        <a href={`#${item.id}`}>
          <div className="aBlock">
            <img src={`/products/${item.sku}_2.jpg`} alt={item.title} />
            <p>{item.title}</p>
          </div>
        </a>
        <div className="price">${item.price}</div>
        <button className="btn btn-primary" onClick={handledAddToCart}>
          Add to card
        </button>
      </div>
    );
  });
  return <div className="item">{productsItems}</div>;
};

export default Products;
