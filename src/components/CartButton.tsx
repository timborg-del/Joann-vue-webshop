import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const CartButton = () => {
  // State to keep track of the number of items in the cart
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItemCount, setCartItemCount] = useState(6);

  return (
    <Link className='cart-button' to='/cart'>
      MyCart
      <span className='cart-counter'>{cartItemCount}</span>
    </Link>
  );
};

export default CartButton;

