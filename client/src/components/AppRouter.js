import React, {useContext} from 'react';

import {
    Routes,
    Route
} from "react-router-dom";
import {authRoutes,publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Home from "../Pages/Home";

const AppRouter = observer(() =>  {
    const {product, user} = useContext(Context)
    console.log(user)
    console.log(product)
    return(
           <Routes>
                {user._isAuth && authRoutes.map(({path, Component}) =>
                     <Route key = {path}  path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path , Component}) =>
                   <Route key = {path} path = {path} element={<Component/>} exact/>
                )}
               <Route path = "*" element={<Home/>}/>
            </Routes>

    );
});

export default AppRouter;