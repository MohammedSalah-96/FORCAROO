import { BrowserRouter, Route, Routes } from "react-router";
import {
  About,
  Blog,
  Contact,
  Home,
  Products,
  Services,
  SystemBuilder,
} from "./pages";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound";
import ServiceDetails from "./components/ServiceDetails";
import BlogDetails from "./components/BlogDetails";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/system-builder" element={<SystemBuilder />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
