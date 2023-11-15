import React, { useContext, useEffect, useState } from "react";
import AppRouter from "./components/AppRouter.js";
import NavBar from "./components/NavBar.js";
import {BrowserRouter} from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { Context } from "./index.js";
import { Spinner } from "react-bootstrap";
import {check} from "./http/userAPI";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
        user.setUser(data.role)
        user.setIsUser(data.id)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>

  );
})

export default App;