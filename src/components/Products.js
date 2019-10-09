import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const Products = ({ products, handledAddToCart }) => {
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
          <button className="btn btn-primary" onClick={handledAddToCart}>
            Add to card
          </button>
        </div>
      );
    });
    return <div className="item">{productsItems}</div>;
  }
};

export default Products;
