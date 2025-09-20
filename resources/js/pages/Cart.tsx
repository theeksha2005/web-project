import { addToCart, updateCartItem, deleteCartItem, fetchCart } from '../services/CartService';

const handleAdd = async () => {
  const item = { product_id: 1, selected_size: 'M', quantity: 2 };
  const result = await addToCart(item);
  console.log('Added:', result);
};

const handleUpdate = async () => {
  const item = { id: 5, quantity: 3 }; // id = cart item id
  const result = await updateCartItem(item);
  console.log('Updated:', result);
};

const handleDelete = async () => {
  const itemId = 5;
  const result = await deleteCartItem(itemId);
  console.log('Deleted:', result);
};
