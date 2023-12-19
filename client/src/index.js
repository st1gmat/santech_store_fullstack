import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore  from './Store/UserStore'
import ProductStore from "./Store/ProductStore";


export const Context = createContext(null)
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
console.log(process.env.REACT_APP_API_URL)
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore()
    }}>
        <App />
    </Context.Provider>,
);



