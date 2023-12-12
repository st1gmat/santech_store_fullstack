import React, { useContext } from 'react';
import { Context } from '../index';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDER_ROUTE,
  SHOP_ROUTE,
  USER_CONTROL_ROUTE
} from '../utils/consts';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token')
    history(LOGIN_ROUTE)
  };

  return (
    <Navbar bg="light" variant="light" expand="md" className="border-bottom">
      <Container>
        <Navbar.Brand
          style={{ color: 'black', cursor: 'pointer' }}
          onClick={() => history(HOME_ROUTE)}
        >
          SantechShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user.isAuth ? (
            <Nav className="ms-auto">
              {user.isRole === 'ADMIN' && (
                <>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(ORDER_ROUTE)}
                    className="me-2"
                  >
                    Заказы
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(ADMIN_ROUTE)}
                    className="me-2"
                  >
                    Админ панель
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(USER_CONTROL_ROUTE)}
                    className="me-2"
                  >
                    USCNTRL
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(SHOP_ROUTE)}
                    className="me-2 fs-6"
                  >
                    Магазин
                  </Button>
                </>
                
              )}
              {user.isRole !== 'ADMIN' && (
                <>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(BASKET_ROUTE)}
                    className="me-2 fs-6"
                  >
                    Корзина
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => history(SHOP_ROUTE)}
                    className="me-2 fs-6"
                  >
                    Магазин
                  </Button>
                </>
              )}
              <Button
                variant="outline-dark"
                onClick={() => logOut()}
                className="fs-6"
              >
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Button
                variant="outline-dark"
                onClick={() => history(LOGIN_ROUTE)}
                className="me-2"
              >
                Авторизация
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
