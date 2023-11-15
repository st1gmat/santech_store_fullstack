// NavBar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { SHOP_ROUTE, BASKET_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import logo from '../assets/logo.png';
import styles from './NavBar.module.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';


const NavBar = observer(() => {
  const {user} = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.removeItem('token')
  }

  return (
      <Navbar bg="dark" variant="dark">
          <Container>
              <label style={{color:'white'}} onClick={() => history("/")}>Shop</label>
              {user.isAuth ?
                  <Nav className="ml-auto" style={{color: 'white'}}>
                      {/* {user.isRole === 'ADMIN' && <Button
                      variant={"outline-light"}
                      onClick={() => history(ORDER_ROUTE)}
                  >
                      Заказики
                  </Button>} */}
                      {user.isRole === 'ADMIN'?<Button
                          variant={"outline-light"}
                          onClick={() => history(ADMIN_ROUTE)}
                          className="ms-3"
                      >
                          Админ панель
                      </Button>: <Button
                          variant={"outline-light"}
                          onClick={() => history(BASKET_ROUTE)}
                      >
                          Корзина
                      </Button> }
                      <Button
                          variant={"outline-light"}
                          onClick={() => logOut()}
                          className="ms-3"
                      >
                          Выйти
                      </Button>
                  </Nav>
                  :
                  <Nav className="ml-auto" style={{color: 'white'}}>
                      <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                  </Nav>
              }
          </Container>
      </Navbar>

  );
});

export default NavBar;


