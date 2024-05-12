

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  productImage: string; // Assuming productImage is a URL
  quantity: number;
}

const CartItems = ({id, name, price, productImage, quantity }: CartItemProps) => (
  <div>
    <p>{id}</p>
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




