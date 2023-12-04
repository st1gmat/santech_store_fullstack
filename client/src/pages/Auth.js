import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REG_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {$authHost} from "../http";

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
                try{
                    data = await login(email, password);
                } catch(exc)
                {
                    alert("Ошибка в email или пароле!");
                }
            } else {
                try{
                data = await registration(email, password);
                } catch(exc)
                {
                    alert("Непредвиденная ошибка");
                }
            }
            user.setUser(data.role)
            user.setIsUser(data.id)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="justify-content-end mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Есть аккаунт? <NavLink to={REG_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войди!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            style={{width: 150}}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
