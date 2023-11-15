import React, {useContext, useState} from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate} from 'react-router-dom'; // Импортируйте Link вместо NavLink
import { observer } from "mobx-react-lite"
import styles from './Auth.module.css';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import {Context} from '../index'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const history = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
      try {
          let data;
          if (isLogin) {
              data = await login(email, password);
          } else {
              data = await registration(email, password);
          }
          user.setUser(data.role)
          user.setIsUser(data.id)
          user.setIsAuth(true)
          history(SHOP_ROUTE)
      } catch (e) {
          alert(e.response.data.message)
      }

  }

  // console.log(location);
  return (
    <Container className={`d-flex flex-column justify-content-center align-items-center ${styles.authContainer}`} >
      <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
      <Form className={styles.authForm}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className=''>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Введите email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
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
          
          <Button 
            className='container'
            variant="outline-primary" 
            onClick={click}
            style={{ marginTop: '15px', width: '410px' }}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Row>
      </Form>
    </Container>
  );
});

export default Auth;
