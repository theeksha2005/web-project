import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import axios from "axios"; // adjust path to your axios config
import { 
  ShoppingCart, Plus, Minus, Star, Heart, Sun, CloudRain, Snowflake, Cloud, Shield, Shirt, Sparkles, Gift, Users, Truck, CreditCard, X 
} from 'lucide-react';

// Type definitions
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  icon: React.ElementType;
  description: string;
  rating: number;
  inStock: boolean;
  ageRange: string;
  color: string;
  sizes?: string[];
  originalPrice?: number;
  isBundle?: boolean;
  isPremium?: boolean;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected_size?: string;
  icon: React.ElementType;
  color: string;
};

type ServerCart = {
  id: number;
  items: CartItem[];
};

const KidsWeatherShop: React.FC = () => {
  const { props } = usePage<{ cart: ServerCart }>();
  const serverCart: ServerCart = props.cart || { items: [], total_cents: 0 };
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cart, setCart] = useState<ServerCart>(props.cart || { items: [], total_cents: 0 });
  

  const products: Product[] = [
    {
      id: 1,
      name: 'Sunny Day Weather Cards',
      category: 'cards',
      price: 12.99,
      icon: Sun,
      description: 'Educational flashcards teaching kids about sunny weather and appropriate clothing',
      rating: 4.8,
      inStock: true,
      ageRange: '3-8 years',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      name: 'Rainy Day Weather Cards',
      category: 'cards',
      price: 12.99,
      icon: CloudRain,
      description: 'Fun flashcards about rainy weather, rainbows, and staying dry!',
      rating: 4.9,
      inStock: true,
      ageRange: '3-8 years',
      color: 'bg-gradient-to-br from-gray-500 to-blue-600'
    },
    {
      id: 3,
      name: 'Winter Weather Cards',
      category: 'cards',
      price: 12.99,
      icon: Snowflake,
      description: 'Discover snow, ice, and winter clothing with these beautiful cards',
      rating: 4.7,
      inStock: true,
      ageRange: '3-8 years',
      color: 'bg-gradient-to-br from-blue-400 to-purple-600'
    },
    {
      id: 4,
      name: 'Complete Weather Card Set',
      category: 'cards',
      price: 34.99,
      originalPrice: 39.99,
      icon: Cloud,
      description: 'All weather types in one complete educational set - Save $5!',
      rating: 5.0,
      inStock: true,
      ageRange: '3-8 years',
      isBundle: true,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      id: 5,
      name: 'Weather Clothing Flashcards',
      category: 'flashcards',
      price: 9.99,
      icon: Shirt,
      description: 'Learn what to wear with these colorful clothing flashcards',
      rating: 4.6,
      inStock: true,
      ageRange: '2-6 years',
      color: 'bg-gradient-to-br from-green-400 to-blue-500'
    },
  {
  id: 6,
  name: 'Sunny Weather T-Shirt',
  category: 'tshirts',
  price: 14.99,
  icon: Shirt,
  description: 'Bright T-shirt for sunny days!',
  rating: 4.5,
  inStock: true,
  ageRange: '3-8 years',
  color: 'bg-yellow-400'
},
{
  id: 7,
  name: 'Rainy Day T-Shirt',
  category: 'tshirts',
  price: 14.99,
  icon: Shirt,
  description: 'Keep dry with this rainy day T-shirt!',
  rating: 4.7,
  inStock: true,
  ageRange: '3-8 years',
  color: 'bg-blue-400'
}

  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Gift },
    { id: 'cards', name: 'Weather Cards', icon: Cloud },
    { id: 'flashcards', name: 'Flashcards', icon: Sparkles },
    { id: 'tshirts', name: 'T-Shirts', icon: Shirt }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
  const cartItemCount = serverCart.items.reduce((total, item) => total + item.quantity, 0);


  const ProductCard: React.FC<{ product: Product, setCart: React.Dispatch<React.SetStateAction<ServerCart>> }> = ({ product, setCart }) => {
    const ProductIcon = product.icon;
    const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes ? product.sizes[0] : null);

  const addToCart = () => {
  axios.post('/api/cart/items',  
    { 
      product_id: product.id, 
      selected_size: selectedSize, 
      quantity: 1 
    }, 
    { 
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content
      }
    }
  )
  .then((res) => {
    if (res.data.success) {
      toast.success(res.data.message || 'Added to cart');
      setCart(res.data.cart); // update cart in React state
    } else {
      toast.error(res.data.error || 'Failed to add to cart');
       console.error('Server error:', res.data.error);
    }
  })
   .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      toast.error(error.response.data?.error || 'Failed to add to cart');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      toast.error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
      toast.error('Failed to add to cart. Please try again.');
    }
  });
};



    return (
      <div className={`${product.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <ProductIcon size={40} className="drop-shadow-lg" />
            {product.isBundle && <Gift size={20} className="text-yellow-300" />}
            {product.isPremium && <Star size={20} className="text-yellow-300" />}
          </div>
          <button onClick={() => toggleFavorite(product.id)}>
            <Heart size={24} className={favorites.includes(product.id) ? 'fill-red-400 text-red-400' : 'text-white/70'} />
          </button>
        </div>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm opacity-90 mb-3">{product.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} />
          <span className="text-sm">{product.ageRange}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'} />
          ))}
          <span className="text-sm ml-1">({product.rating})</span>
        </div>
        {product.sizes && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Size:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`${selectedSize === size ? 'bg-white text-gray-800 shadow-lg' : 'bg-white/20 hover:bg-white/30'} px-3 py-1 rounded-full text-xs font-semibold transition-all`}>{size}</button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">Rs {product.price}</span>
          {product.originalPrice && <span className="text-lg line-through opacity-70">Rs {product.originalPrice}</span>}
        </div>
        <button onClick={addToCart} disabled={!product.inStock} className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
          <ShoppingCart size={20} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full"><Cloud size={32} className="text-white" /></div>
              <div>
                <h1 className="text-3xl font-bold text-white">Weather Kids Store</h1>
                <p className="text-white/80">Educational fun for little weather explorers!</p>
              </div>
            </div>
            <button onClick={() => setShowCart(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-full transition-all duration-200 flex items-center gap-3 hover:scale-105 relative">
              <ShoppingCart size={24} />
              <span>Cart ({cartItemCount})</span>
            </button>
          </div>
        </header>
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => {
            const CategoryIcon = category.icon;
            return (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${selectedCategory === category.id ? 'bg-white text-purple-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'} backdrop-blur-sm`}>
                <CategoryIcon size={20} /> {category.name}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} setCart={setCart} />)}
        </div>
      </div>
    </div>
  );
};

export default KidsWeatherShop;
