import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../';
import { getOrder, getUserOrderList, deleteOrder, updateUserOrder } from '../http/productAPI';
import { Card, Col, Container, Row, Button, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts';
import { calculateTotalSum } from '../utils/calculations';

const Order = observer(() => {
    const { product, user } = useContext(Context);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
    const myRef = useRef(null);
    const history = useNavigate();

    useEffect(() => {
        getOrder(user.isUser).then(data => product.setOrders(data));
        getUserOrderList(product.selectedOrder).then(data => product.setOrdersList(data));
    }, [product, product.selectedOrder]);

    const handleChangeStatus = (id, status) => {
        updateUserOrder(id, status);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);

            getOrder(user.isUser).then(data => product.setOrders(data));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    

    return (
        <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
            <h1 className="pt-5 pb-2">Все заказы</h1>

            {product.order.map(currOrder => (
                
                <Card key={currOrder.id} className="d-flex w-100 pb-3  m-3">
                    <Row>
                        <Row className="row pb-1 m-3 ">
                            <Col className={"mt-3"}>Addresse</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Действия</Col>

                        </Row>
                        <Row className="row pb-1 m-3 ">
                            <Col>
                                <h3>{currOrder.addressee}</h3>
                            </Col>
                            <Col>
                                <h3>{currOrder.postcode}</h3>
                            </Col>

                            <Col>
                                
                                <Button
                                    className="w-50 m-1"
                                    onClick={() => product.setSelectedOrder(currOrder.id)}
                                >
                                    Подробнее
                                </Button>
                                <Button variant="danger" className="w-50 m-1" onClick={() => handleDeleteOrder(currOrder.id)}>
                                    Закрыть заказ
                                </Button>
                            </Col>
                        </Row>
                        
                        
                        {console.log(currOrder)}

                    </Row>
                    {currOrder.id === product.selectedOrder && (
                        <div>
                            <h3>Selected Product Information:</h3>
                            <p>Заказ ID: {currOrder.id}</p>
                            <p>Номер телефона: {currOrder.phone}</p>

                            <p> Дата поступления заказа: {currOrder.createdAt}</p>
                            <p>Пользователь ID: {currOrder.userId}</p>
                            <h4>Товар</h4>
                            
                            <Row>

                                
                            </Row>
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {product.orders_lists.map(orderProduct => (
                                    <tr key={orderProduct.id}>
                                        <td>{orderProduct.product.id} </td>
                                        <td 
                                            style={{cursor:'pointer'}}
                                            onClick={() => history(PRODUCT_ROUTE + '/' + orderProduct.product.id)}>
                                                {orderProduct.product.name}
                                        </td>
                                        <td>{orderProduct.product.price} руб.</td>
                                    </tr>
                                    
                                ))}
                                </tbody>
                            </Table>
                            <div style={{textAlign:'right', marginRight: '280px'}}>
                                <h4 className=''>Total Sum: <u>{calculateTotalSum(product.orders_lists)}</u> руб.</h4>
                            </div>
                        </div>
                    )}
                </Card>
            ))}
        </Container>
    );
});

export default Order;
