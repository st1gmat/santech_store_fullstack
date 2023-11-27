import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../';
import {addToBasket, deleteFromBasket, getBasket, getUserOrder, getUserOrderList} from '../http/productAPI';
import {Button, Card, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";
import Image from "react-bootstrap/Image";

const Basket = observer(() => {
    const {product,user, a} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    useEffect(() => {
        getBasket().then(data => product.setBaskets(data))
        getUserOrder(user.isUser).then(data => product.setOrders(data))
        getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data))
    }, [product,product._selectedOrder, a])

const refreshPage = ()=>{
    window.location.reload();
}
    const _delete = (id) => {
        deleteFromBasket(id).then(response => alert(`Товар удален из корзины`)).then(response => refreshPage())

    }

    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {product.basket.map(price =>
        prices += price.product.price
    )}
    let prices2 = 0;
     {product._orders_lists.map(price =>
        prices2 += price.product.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>

            {/* ------- Считаем общую сумму ------- */}

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h1 className="align-self-end" >Всего:</h1>
                <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> руб. </span></h3>
            </Card>
            {product.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2"  key={product.id}>

                        <Row>
                            <Col md="2" className="d-inline-flex flex-row">
                            <div className="flex-row" >
                                <img src={process.env.REACT_APP_API_URL + product.product.img} alt="img not found" height={100}  />
                            </div>
                            </Col>
                            <Col  className="d-flex flex-row">
                            <div className="flex-row">
                                <h1 className="ms-3">{product.product.name}</h1>
                            </div>
                            </Col>
                                <Col  className="d-flex flex-row justify-content-end">
                            <div className="flex-row">
                                <h2 className="font-weight-light">{product.product.price} руб. </h2>
                            </div>
                                </Col>
                            <Col  className="d-flex flex-row justify-content-end">
                                <div className="flex-row">
                                    <Button className="bg-danger" onClick={() => _delete(product.id)}> Удалить </Button>
                                </div>
                            </Col>
                        </Row>
                </Card>
            )}

            <Row> <Button className="bg-success" onClick={() => setOrderVisible(true)} >Отправить заказ</Button> </Row>

            <h1 className="pt-5 pb-2">Предыдущие заказы</h1>


            {product.order.map(product =>


                <Card className="d-flex w-100 pb-3  m-3">
                    <Row className=" d-flex m-3">
                        <Row className=" w-100 row pb-1">

                            <Col className={"mt-3"}>Address</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Status</Col>
                        </Row>
                        <Row>
                        <Col><h3>{product.addressee}</h3></Col>
                        <Col><h3>{product.postcode}</h3></Col>
                        <Col>
                            {{
                                '0': <h3> Closed</h3>,
                                '1': <h3> Stay</h3>,
                                '2': <h3> Go</h3>,
                                '3': <h3> Complete</h3>
                            }[product.status]}
                            <Button className="w-75 align-self-center ms" onClick={() => product.setSelectedOrder(product.id)}> Open </Button>
                        </Col>
                        </Row>

                    </Row>
                    {product.id == product.selectedOrder &&
                    <Row className=" d-flex mb-2 p-4 w-100  m-3">
                        <Col className={"mt-3"}>Name</Col>
                        <Col className={"mt-3"}>Price</Col>
                        <Col className={"mt-3"}>Image</Col>
                    </Row>}
                    {product.id == product.selectedOrder &&
                    product._orders_lists.map
                    (product =>
                        <Card className=" d-flex mb-2 p-4 m-3  ">
                            <Row className="row">

                                <Col className={"mt-3"}>{product.product.name}</Col>
                                <Col className={"mt-3"}>{product.product.price}</Col>
                                <Col className={"mt-3"}><Image width={75} height={75} src={process.env.REACT_APP_API_URL + product.product.img}/></Col>
                            </Row>
                        </Card>
                    )}
                    {product.id == product.selectedOrder &&
                    <Card className="d-flex flex-row  p-2 m-3 justify-content-between align-items-center mb-2">
                        <h1 className="align-self-end" >Всего:</h1>
                        <h3  className="ms-3 align-self-end">{prices2}<span className="font-weight-light pl-2"> руб. </span></h3>
                    </Card>}

                </Card>
            )}




            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
    );

});

export default Basket;
