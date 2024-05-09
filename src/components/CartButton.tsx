import { Link } from 'react-router-dom';
import { useState } from 'react';
 // Import CSS file for CartButton styles

const CartButton = () => {
  // State to keep track of the number of items in the cart
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItemCount, ] = useState(6);

  return (
    <Link to='/cart' className="cart-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-shopping-cart"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="6" cy="19" r="2" />
        <circle cx="17" cy="19" r="2" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
      <span className='cart-counter'>{cartItemCount}</span>
    </Link>
  );
};

export default CartButton;
