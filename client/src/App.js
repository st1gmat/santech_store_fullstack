import React from "react";
import AppRouter from "./components/AppRouter.js";
import NavBar from "./components/NavBar.js";
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>

  );
}

export default App;