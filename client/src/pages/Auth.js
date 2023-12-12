import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Alert } from 'react-bootstrap';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userAPI';
import { Context } from '../index';
import Row from 'react-bootstrap/Row';
import { validateEmail } from '../utils/validation';
import ReCAPTCHA from 'react-google-recaptcha';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null);
  

    //   const click = async () => {
    //     try {
    //       if (!validateEmail(email)) {
    //         setErrorMessage('Некорректный email или пароль!');
    //         return;
    //       }

    //       let data;
    //       if (isLogin) {
    //         data = await login(email, password);
    //       } else {
    //         data = await registration(email, password);
    //       }

    //       user.setUser(data.role);
    //       user.setIsUser(data.id);
    //       user.setIsAuth(true);
    //       history(SHOP_ROUTE);
    //     } catch (e) {
    //         setErrorMessage('Некорректный email или пароль!');
    //     }
    //   };
    const click = async () => {
        try {
            if (!validateEmail(email) || !recaptchaValue) {
                setErrorMessage('Некорректный email, пароль или не пройдена проверка reCAPTCHA!');
                return;
            }

            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, firstName, lastName);
            }

            user.setUser(data.role);
            user.setIsUser(data.id);
            user.setIsAuth(true);
            history(SHOP_ROUTE);
        } catch (e) {
            setErrorMessage('Некорректный email или пароль!');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    {!isLogin && 
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваше имя..."
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                       
                    }
                    {!isLogin &&
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите вашу фамилию..."
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    }
                    <ReCAPTCHA
                        className='mt-2'
                        sitekey="6LfRKi4pAAAAAMWAPsXYmged85-kG4ht1QiGfHQ0"
                        onChange={(value) => setRecaptchaValue(value)}
                    />
                    <Row className="justify-content-end mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Нет аккаунт? <NavLink to={REG_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди!</NavLink>
                            </div>
                        )}
                        <Button variant={'outline-success'} onClick={click} style={{ width: 150 }}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
