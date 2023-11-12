// NavBar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { SHOP_ROUTE, BASKET_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import logo from '../assets/logo.png';
import styles from './NavBar.module.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';


const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate()

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className={`px-3 py-2 ${styles.navbar}`}>
      <NavLink to='/' className={styles.navLink}>
        <img src={logo} alt="SantechStore Logo" />
        <span>SantechStore</span>
      </NavLink>

      <Nav className="ms-auto">
        <NavLink to={SHOP_ROUTE} className={styles.navLink}>
          Shop
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='ms-2 mb-1' viewBox="0 0 16 16">
            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </NavLink>
        <NavLink to={BASKET_ROUTE} className={styles.navLink}>
          Basket
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='ms-2 mb-1' viewBox="0 0 16 16">
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </NavLink>

        {user.isAuth ? (
          <div>
            {/* <Button variant={'outline-dark'} className={styles.adminPanelButton} as={NavLink} to={ADMIN_ROUTE}>
              Админ панель
            </Button>
            <Button variant={'outline-dark'} as={NavLink} to="/">
              Выйти
            </Button> */}
            <Button variant={'outline-dark'} className={`${styles.adminPanelButton} ms-1`} onClick={() => navigate(ADMIN_ROUTE)}>
              Админ панель
            </Button>
            <Button variant={'outline-dark'} className='ms-3' onClick={() => navigate(LOGIN_ROUTE)}>
              Выйти
            </Button>
          </div>
          ) : (
          <div>
            <Button variant={'outline-dark'} onClick={() => navigate(LOGIN_ROUTE)}>
              Авторизация
            </Button>
          </div>
            
          )}
      </Nav>
    </Navbar>
  );
});

export default NavBar;
