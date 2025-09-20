import axios from '../axiosSetup';

export const addToCart = async (item) => {
  try {
    const response = await axios.post('/cart/store', item);
    return response.data;
  } catch (error) {
    console.error('Add to cart error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCartItem = async (item) => {
  try {
    const response = await axios.put(`/cart/items/${item.id}`, {
      quantity: item.quantity
    });
    return response.data;
  } catch (error) {
    console.error('Update cart item error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`/cart/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Delete cart item error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const response = await axios.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Fetch cart error:', error.response?.data || error.message);
    throw error;
  }
};