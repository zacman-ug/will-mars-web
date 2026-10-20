import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import MenuItemPage from './pages/MenuItem';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AuthPage from './pages/Auth';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Routes>
            <Route path="/account" element={<AuthPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/:id" element={<MenuItemPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
