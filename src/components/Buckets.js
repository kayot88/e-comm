import React from 'react';

const Buckets = ({ cartItems, handleRemoveFromCart }) => {
  return (
    <div className="col-md-4 buckets">
      <div className="buckets-alert aler-info">
        {cartItems.length === 0
          ? 'no items found'
          : `${cartItems.length} items found`}
        {cartItems.length > 0 && (
          <div>
            <ul className="buckets-list">
              {cartItems.map(item => (
                <li key={item.id} className="listItem">
                  {item.title}x {item.count} = ${item.price * item.count}
                  <button
                    className="btn btn-danger"
                    onClick={e => handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <div className="total">
              <div className="total-count">
                Total count: {cartItems.reduce((a, c) => c.count + a, 0)}
              </div>
              <div className="totalCount">
                Total sum: $
                {cartItems.reduce((a, c) => c.count * c.price + a, 0)}
              </div>
            </div>
            <button
              onClick={() => alert('Todo: Implement checkout page.')}
              className="btn btn-primary"
            >
              checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Buckets;
