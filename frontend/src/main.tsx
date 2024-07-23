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
import CartPage from './pages/cartPage/CartPage.tsx';
import SignInPage from "./pages/signInPage/SignInPage.tsx";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage/>} />
      <Route path="signin" element={<SignInPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
