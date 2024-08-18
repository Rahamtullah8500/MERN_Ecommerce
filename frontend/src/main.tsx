import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage.tsx";
import ProductPage from "./pages/productPage/ProductPage.tsx";
import axios from "axios";
import { Provider } from "react-redux";
import Store from "./redux/Store.tsx";
import { HelmetProvider } from "react-helmet-async";
import CartPage from "./pages/cartPage/CartPage.tsx";
import SignInPage from "./pages/signInPage/SignInPage.tsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.tsx";
import ShippingAddressPage from "./pages/shippingAddressPage/ShippingAddressPage.tsx";
import PaymentMethodPage from "./pages/paymentMethodPage/PaymentMethodPage.tsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PlaceOrderPage from "./pages/placeOrderPage/PlaceOrderPage";
import OrderPage from "./pages/orderPage/OrderPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage.tsx";
import NotFoundPage from "./pages/notFound/NotFound.tsx";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="/payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <Provider store={Store}>
        <PayPalScriptProvider
          options={{ "client-id": "sb" }}
          deferLoading={true}
        >
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
);
