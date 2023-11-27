import {HOME_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REG_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Basket from "./Pages/Basket";
import AdminPage from "./Pages/AdminPage";
import Shop from "./Pages/Shop";
import Home from "./Pages/Home"
import Auth from "./Pages/Auth";
import ProductPage from "./Pages/ProductPage";
import Order from "./Pages/Order";


export const authRoutes = [

  

  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
]

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REG_ROUTE,
    Component: Auth
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage
  },
  {
    path: ORDER_ROUTE,
    Component: Order
  },

]