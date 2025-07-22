import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star, Heart, Sun, CloudRain, Snowflake, Cloud, Shield, Shirt, Glasses, Package, Footprints, Umbrella, Users, Zap, CheckCircle, X, CreditCard, Truck, Sparkles, Gift } from 'lucide-react';

const KidsWeatherShop = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    // Weather Cards
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
    // Flashcards
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
      name: 'Weather Safety Flashcards',
      category: 'flashcards',
      price: 11.99,
      icon: Shield,
      description: 'Important safety tips for different weather conditions',
      rating: 4.8,
      inStock: true,
      ageRange: '4-10 years',
      color: 'bg-gradient-to-br from-red-400 to-pink-500'
    },
    {
      id: 7,
      name: 'Weather Activity Flashcards',
      category: 'flashcards',
      price: 8.99,
      icon: Sparkles,
      description: 'Fun activities and games for every type of weather',
      rating: 4.5,
      inStock: true,
      ageRange: '3-8 years',
      color: 'bg-gradient-to-br from-purple-400 to-indigo-600'
    },
    // T-Shirts
    {
      id: 8,
      name: 'Sunny Weather Hero T-Shirt',
      category: 'tshirts',
      price: 18.99,
      icon: Sun,
      description: 'Bright yellow t-shirt with fun sun design - 100% cotton',
      rating: 4.7,
      inStock: true,
      sizes: ['2T', '3T', '4T', '5T', 'XS', 'S', 'M'],
      color: 'bg-gradient-to-br from-yellow-300 to-yellow-600'
    },
    {
      id: 9,
      name: 'Rainy Day Explorer T-Shirt',
      category: 'tshirts',
      price: 18.99,
      icon: CloudRain,
      description: 'Cool blue t-shirt perfect for little weather explorers',
      rating: 4.6,
      inStock: true,
      sizes: ['2T', '3T', '4T', '5T', 'XS', 'S', 'M'],
      color: 'bg-gradient-to-br from-blue-400 to-blue-700'
    },
    {
      id: 10,
      name: 'Snow Day Adventure T-Shirt',
      category: 'tshirts',
      price: 18.99,
      icon: Snowflake,
      description: 'Cozy white t-shirt with beautiful snowflake patterns',
      rating: 4.8,
      inStock: true,
      sizes: ['2T', '3T', '4T', '5T', 'XS', 'S', 'M'],
      color: 'bg-gradient-to-br from-blue-200 to-purple-400'
    },
    {
      id: 11,
      name: 'Weather Master T-Shirt',
      category: 'tshirts',
      price: 22.99,
      icon: Cloud,
      description: 'Premium t-shirt featuring all weather types - Perfect for weather experts!',
      rating: 5.0,
      inStock: true,
      sizes: ['2T', '3T', '4T', '5T', 'XS', 'S', 'M'],
      isPremium: true,
      color: 'bg-gradient-to-br from-indigo-500 to-purple-700'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Gift },
    { id: 'cards', name: 'Weather Cards', icon: Cloud },
    { id: 'flashcards', name: 'Flashcards', icon: Sparkles },
    { id: 'tshirts', name: 'T-Shirts', icon: Shirt }
  ];

  const addToCart = (product, size = null) => {
    const cartItem = {
      ...product,
      selectedSize: size,
      quantity: 1,
      cartId: `${product.id}-${size || 'default'}`
    };

    setCart(prev => {
      const existingItem = prev.find(item => item.cartId === cartItem.cartId);
      if (existingItem) {
        return prev.map(item =>
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const ProductCard = ({ product }) => {
    const ProductIcon = product.icon;
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);

    return (
      <div className={`${product.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm`}>
        {/* Product Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <ProductIcon size={40} className="drop-shadow-lg" />
            {product.isBundle && <Gift size={20} className="text-yellow-300" />}
            {product.isPremium && <Star size={20} className="text-yellow-300" />}
          </div>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="hover:scale-110 transition-transform"
          >
            <Heart
              size={24}
              className={favorites.includes(product.id) ? 'fill-red-400 text-red-400' : 'text-white/70'}
            />
          </button>
        </div>

        {/* Product Info */}
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm opacity-90 mb-3">{product.description}</p>
        
        {/* Age Range */}
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} />
          <span className="text-sm">{product.ageRange}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'}
            />
          ))}
          <span className="text-sm ml-1">({product.rating})</span>
        </div>

        {/* Size Selection for T-Shirts */}
        {product.sizes && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Size:</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedSize === size
                      ? 'bg-white text-gray-800 shadow-lg'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-lg line-through opacity-70">${product.originalPrice}</span>
          )}
          {product.isBundle && (
            <span className="text-xs bg-green-500 px-2 py-1 rounded-full font-semibold">SAVE $5</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, selectedSize)}
          disabled={!product.inStock}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={20} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Cloud size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Weather Kids Store</h1>
                <p className="text-white/80">Educational fun for little weather explorers!</p>
              </div>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-full transition-all duration-200 flex items-center gap-3 hover:scale-105 relative"
            >
              <ShoppingCart size={24} />
              <span>Cart ({cartItemCount})</span>
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(category => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } backdrop-blur-sm`}
              >
                <CategoryIcon size={20} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Shopping Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingCart size={28} />
                  Shopping Cart ({cartItemCount})
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm">Add some amazing weather products!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={item.cartId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                          <div className={`${item.color} p-3 rounded-2xl text-white`}>
                            <ItemIcon size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            {item.selectedSize && (
                              <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                            )}
                            <p className="text-sm text-gray-600">${item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="bg-red-100 hover:bg-red-200 p-1 rounded-full transition-colors"
                            >
                              <Minus size={16} className="text-red-600" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="bg-green-100 hover:bg-green-200 p-1 rounded-full transition-colors"
                            >
                              <Plus size={16} className="text-green-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t bg-gray-50 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Total: ${cartTotal.toFixed(2)}</span>
                    <div className="flex items-center gap-2 text-green-600">
                      <Truck size={20} />
                      <span className="text-sm">Free shipping on orders over $25!</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105 active:scale-95">
                    <CreditCard size={24} />
                    Checkout Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-white/80 py-8">
          <p className="mb-2">🌟 Making weather learning fun and fashionable! 🌟</p>
          <p className="text-sm">Free shipping on orders over $25 • 30-day returns • Kid-tested quality</p>
        </footer>
      </div>
    </div>
  );
};

export default KidsWeatherShop;