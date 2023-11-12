import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Shop from '../pages/Shop';
import Admin from '../pages/Admin';
import Basket from '../pages/Basket';
import Auth from '../pages/Auth';
import ProductPage from '../pages/ProductPage';
import HomePage from '../pages/HomePage'
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from "../utils/consts";
import {Context} from "../index"

function AppRouter() {
//   let isAuth = false;
    const {user} = useContext(Context)
    console.log(user)
    return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={SHOP_ROUTE} element={<Shop />} />
                <Route path={SHOP_ROUTE} element={<Shop />} />
                <Route path={LOGIN_ROUTE} element={<Auth />} />
                <Route path={REGISTRATION_ROUTE} element={<Auth />} />
                <Route path={PRODUCT_ROUTE + "/:id"} element={<ProductPage />} />
                <Route path={BASKET_ROUTE} element={user.isAuth ? (<Basket />) : (<Navigate to={LOGIN_ROUTE} />)} />
                <Route path={ADMIN_ROUTE} element={user.isAuth ? (<Admin />) : (<Navigate to={LOGIN_ROUTE} />)} />
            </Routes>
    );
}

export default AppRouter;
