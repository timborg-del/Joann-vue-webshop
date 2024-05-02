
export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const CartItems = ({ id, name, price, quantity,}: CartItemProps) => (
    <div>
      <p>key: {id}</p>

      <p>Name: {name}</p>
      <p>Price: ${price}</p>
      <p>Quantity: {quantity}</p>
    </div>
  );
  
  export default CartItems;
