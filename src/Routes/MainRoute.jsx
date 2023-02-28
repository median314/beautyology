import React from "react";
import { Route, Routes } from "react-router-dom";
import CoursePage from "../Pages/CoursePage";
import HomePage from "../Pages/HomePage";
import ProductPage from "../Pages/ProductPage";
import LoginPages from "../Pages/LoginPages";
import SignUpPage from "../Pages/SignUpPage";
import UserPage from "../Pages/UserPage";
import ProductSinglePage from "../Pages/ProductSinglePage";
import CourseSinglePage from "../Pages/CourseSinglePage";
import OrderPage from "../Pages/OrderPage";
import ProductBundleSinglePage from "../Pages/ProductBundleSinglePage";
import ProtectedRoutes from "./ProtectedRoutes";
import CartPage from "../Pages/CartPage";
import WishlistPage from "../Pages/WishlistPage";
import CheckoutPage from "../Pages/CheckoutPage";
import HelpPage from "../Pages/HelpPage";
import InvoicePage from "../Pages/InvoicePage";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/course" element={<CoursePage />} />

      <Route
        path="/course/:id"
        element={
          <ProtectedRoutes>
            <CourseSinglePage />
          </ProtectedRoutes>
        }
      />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPages />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/help" element={<HelpPage />} />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoutes>
            <ProductSinglePage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/product/bundle/:id"
        element={
          <ProtectedRoutes>
            <ProductBundleSinglePage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <UserPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoutes>
            <OrderPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoutes>
            <CartPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoutes>
            <WishlistPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoutes>
            <CheckoutPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/invoice"
        element={
          <ProtectedRoutes>
            <InvoicePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default MainRoute;
