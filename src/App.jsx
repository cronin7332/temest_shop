import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { ShopContextProvider } from './context/shop-context';
import Login from './components/login';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (authToken) => {
    // Update the token state
    setToken(authToken);
  };

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          {token && <Navbar />}

          <Routes>
            <Route
              path="/"
              element={
                // Redirect to /shop if already authenticated
                token ? (
                  <Navigate to="/shop" />
                ) : (
                  // Pass the handleLogin function to the Login component
                  <Login onLogin={handleLogin} />
                )
              }
            />
            {/* Protected route for Shop */}
            <Route
              path="/shop"
              element={
                // Render Shop component only if authenticated
                token ? <Shop /> : <Navigate to="/" />
              }
            />
            {/* Protected route for Cart */}
            <Route
              path="/cart"
              element={
                // Render Cart component only if authenticated
                token ? <Cart /> : <Navigate to="/" />
              }
            />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;