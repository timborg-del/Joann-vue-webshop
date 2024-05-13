

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
}

const CartItems = ({id, name, price, productImage, quantity }: CartItemProps) => (
  <div className="cart-items-prop" >
    <img 
      alt={name}
      src={productImage} 
      />
      <div >
      <p>{id}</p>
      <p>{name}</p>
      <p>${price}</p>
     {/* Render the image */}
    <p>Quantity: {quantity}</p>
    </div>
  </div>
);

export default CartItems;




