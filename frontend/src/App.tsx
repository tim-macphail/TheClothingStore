// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import Item from './pages/Item';
import { CartProvider } from './context/CartContext';

const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/cart';

    return (
        <div>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/item/:id" element={<Item />} />
                <Route path="/*" element={<Browse />} />
            </Routes>
        </div>
    );
};

function App() {
    return (
        <Router>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </Router>
    );
}

export default App;