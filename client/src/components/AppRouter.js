import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Shop from '../pages/Shop';
import Admin from '../pages/Admin';
import Basket from '../pages/Basket';
import Auth from '../pages/Auth';
import ProductPage from '../pages/ProductPage';
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
  let isAuth = false;
    const {user} = useContext(Context)
    console.log(user)
    return (
        <BrowserRouter>
            <Routes>
                <Route path={SHOP_ROUTE} element={<Shop />} />
                <Route path={LOGIN_ROUTE} element={<Auth />} />
                <Route path={REGISTRATION_ROUTE} element={<Auth />} />
                <Route path={PRODUCT_ROUTE} element={<ProductPage />} />

                <Route
                    exact
                    path={BASKET_ROUTE}
                    element={
                        isAuth ? (
                        <Basket />
                        ) : (
                        <Navigate replace to={LOGIN_ROUTE} />
                        )
                    }
                />
                
                <Route
                    exact
                    path={ADMIN_ROUTE}
                    element={
                        isAuth ? (
                        <Admin />
                        ) : (
                        <Navigate replace to={LOGIN_ROUTE} />
                        )
                    }
                />
                

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
