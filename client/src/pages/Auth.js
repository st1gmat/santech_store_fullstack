import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { Link, useLocation} from 'react-router-dom'; // Импортируйте Link вместо NavLink
import styles from './Auth.module.css';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  // console.log(location);
  return (
    <Container className={`d-flex flex-column justify-content-center align-items-center ${styles.authContainer}`} >
      <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
      <Form className={styles.authForm}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className=''>Email</Form.Label>
          <Form.Control type="email" placeholder="Введите email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" />
        </Form.Group>
        <Row>
          {isLogin ?
            <div>
              Нет аккаунта? <Link className={styles.regLink} to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
            </div>
            :
            <div>
              Есть аккаунт? <Link className={styles.regLink} to={LOGIN_ROUTE}>Войдите!</Link>
            </div>
          }
          
          <Button className='container' variant="outline-primary" type="submit" style={{ marginTop: '15px', width: '410px' }}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default Auth;
