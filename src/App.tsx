import React, { useState } from 'react';
import { Coffee, ShoppingCart, Plus, Minus, LogOut } from 'lucide-react';
import menuItems from './data/menuItems';
import Login from './components/Login';
import Receipt from './components/Receipt';
import { MenuItem, OrderItem } from './types';

function App() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const addToOrder = (item: MenuItem) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (item: OrderItem) => {
    if (item.quantity > 1) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
      );
    } else {
      setOrder(order.filter((orderItem) => orderItem.id !== item.id));
    }
  };

  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setOrder([]);
    setShowReceipt(false);
  };

  const handlePlaceOrder = () => {
    setShowReceipt(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-800 text-amber-50 py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold flex items-center">
            <Coffee className="mr-4" size={40} />
            Cozy Corner Café
          </h1>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {username}!</span>
            <button
              onClick={handleLogout}
              className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center"
            >
              <LogOut size={20} className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showReceipt ? (
          <Receipt order={order} total={total} username={username} />
        ) : (
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-2/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full ${
                        activeCategory === category
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-amber-50 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-amber-800">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
                        onClick={() => addToOrder(item)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 px-4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <ShoppingCart className="mr-2" /> Your Order
                </h2>
                {order.length === 0 ? (
                  <p className="text-gray-500">Your order is empty</p>
                ) : (
                  <>
                    {order.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="text-amber-600 hover:text-amber-800"
                            onClick={() => removeFromOrder(item)}
                          >
                            <Minus size={20} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="text-amber-600 hover:text-amber-800"
                            onClick={() => addToOrder(item)}
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <button
                        className="w-full bg-amber-600 text-white py-2 rounded-full mt-4 hover:bg-amber-700 transition-colors"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-amber-800 text-amber-50 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Cozy Corner Café. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;