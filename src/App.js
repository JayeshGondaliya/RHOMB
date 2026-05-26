import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Layout } from "./components/ui/Layout";

/* Pages */
import Home from "./routes/Home";
import About from "./routes/About";
import Admin from "./routes/admin";
import BuyGold from "./routes/buy-gold";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Contact from "./routes/contact";
import Custom from "./routes/custom";
import Login from "./routes/login";
import Product from "./routes/product.$id";
import Shop from "./routes/shop";
import Wishlist from "./routes/wishlist";
import Sell from "./routes/sell";
import ScrollToTop from "./lib/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
          {/* <Route path="buy-gold" element={<BuyGold />} /> */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="custom" element={<Custom />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop" element={<Shop />} />
          {/* <Route path="sell" element={<Sell />} /> */}
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="product/:id" element={<Product />} />

          <Route
            path="*"
            element={
              <div className="text-center text-white p-20">
                Page not found
              </div>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;