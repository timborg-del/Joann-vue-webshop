

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
}

const CartItems = ({ name, price, productImage, quantity }: CartItemProps) => (
  <div>
    
    <p>{name}</p>
    <p>${price}</p>
    <img 
      src={productImage} 
      alt={name} 
    /> {/* Render the image */}
    <p>Quantity: {quantity}</p>
  </div>
);

export default CartItems;




