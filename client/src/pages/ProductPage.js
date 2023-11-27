import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {addToBasket, delProduct, fetchOneProduct, setDescription, updateAmount} from "../http/productAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import SetDescription from "../components/modals/SetDescription";

const ProductPage = observer(() => {

    const {user} = useContext(Context)
    const [product, setProduct] = useState({info: []})
    const {id} = useParams()
    const [productVisible, setProductVisible] = useState(false)
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    const [value, setValue] = useState('')

    const Amount = () => {
        updateAmount(id, value).then(response => alert(`Количество товара обновлено`))
    }


    // ------- функция добавления в корзину ------- //
    const add = () => {
        const formData = new FormData()
        formData.append('productId', id)
        addToBasket(formData).then(response => alert(`Товар ` + product.name + ` был добавлен в корзину!`))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
                    <h1>{product.name}</h1>
                </Col>
                <Col>
                    <h2>Характеристики</h2>
                    {product.info.map((info, index) =>
                        <Row key={info.id} style={{
                            border: '2px solid lightgray',
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}>
                            <Col>{info.title}</Col><Col> : {info.description}</Col>
                        </Row>
                    )}
                </Col>
            </Row><br/>
            <Row>
                <Col className={"w-75"}>
                    <label >
                        {product._info}
                    </label>
                </Col>
                <Col md={3}>
                <Card
                    className="d-flex flex-column align-items-center align-self-end p-3 "
                    style={{width: 300, fontSize: 32, border: '5px solid light'}}
                >
                    <h3>Вид: {product.price} руб.</h3>


                    <Button variant={"outline-dark"} className="bg-success text-light" onClick={add}>Добавить в корзину</Button>

                </Card>
                </Col>
            </Row>
            {user.isRole === "ADMIN"?
            <Row>

                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 bg-primary text-light"
                    onClick={() => setProductVisible(true)}
                >
                    Добавить описание
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 bg-danger text-light"
                    onClick={() => delProduct(id).then(response => alert(`Товар удален!`)) }
                >
                    Удалить
                </Button>
                <Row>
                    <Col>
                        <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Введите количество "}
                            style={{height:"auto"}}
                            className="mt-4 w-100 p-2"
                        />
                    </Form>
                    </Col>
               <Col>
                   <Button
                       variant={"outline-dark"}
                   className="mt-4 w-100 p-2 bg-success text-light"
                   onClick={Amount}
               >
                   Обновить количество
               </Button>
               </Col>

                </Row>
                <SetDescription show={productVisible} onHide={() => setProductVisible(false)}/>
            </Row>:<br/>
        }
        </Container>
    );
});
export default ProductPage;
