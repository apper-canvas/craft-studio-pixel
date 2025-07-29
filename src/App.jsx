import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import ProductCatalog from "@/components/pages/ProductCatalog";
import ProductDetail from "@/components/pages/ProductDetail";
import DesignStudio from "@/components/pages/DesignStudio";
import MyOrders from "@/components/pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductCatalog />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/design-studio" element={<DesignStudio />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;