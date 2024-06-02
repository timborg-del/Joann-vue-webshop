

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
  size?: string;
}

const CartItems = ({name, price, productImage, quantity, size }: CartItemProps) => (
  <div className="cart-items-prop" >
    <img 
      src={productImage} 
      />
      <div >
      <p>{name}</p>
      <p>{size}</p>
      <p>${price}</p>
     {/* Render the image */}
    <p>Quantity: {quantity}</p>
    </div>
  </div>
);

export default CartItems;




