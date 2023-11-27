// import React, {useEffect, useRef} from 'react';
// import { useContext, useState } from 'react';
// import { Context } from '../index';
// import {fetchBrands, fetchLegal, fetchTypes, getOrder, getUserOrderList} from '../http/productAPI';
// import {Button, Card, Col, Container, Dropdown, Row} from 'react-bootstrap'
// import { observer } from 'mobx-react-lite';
// import CreateOrder from "../components/modals/CreateOrder";

// const Order = observer(() => {
//     const {product} = useContext(Context)
//     const {user} = useContext(Context)
//     const {a } = useContext(Context)
//     const [orderVisible, setOrderVisible] = useState(false)
//     const myRef = useRef(null)
//     useEffect(() => {
//         getOrder(user.isUser).then(data => product.setOrders(data))
//         getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data))
//     }, [product,product._selectedOrder, a])

    
//     // считаем общую сумму, которую юзер набрал в корзину
//     let prices = 0;
//     {product._orders_lists.map(price =>
//         prices += price.product.price
//     )}
//     return (
//         <Container
//             className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
//         >
//             <h1 className="pt-5 pb-2">Все заказы</h1>


//             {product.order.map(products =>


//                 <Card className="d-flex w-100 pb-3  m-3">
//                     <Row d-flex>
//                         <Row className="row pb-1 m-3 ">

//                             <Col className={"mt-3"}>Addressee</Col>
//                             <Col className={"mt-3"}>Postcode</Col>
//                             <Col className={"mt-3"}>Status</Col>
//                         </Row>
//                         <Row className="row pb-1 m-3 ">
//                             <Col><h3>{products.addressee}</h3></Col>
//                             <Col><h3>{products.postcode}</h3></Col>
//                             <Col>
//                                 {{
//                                     '0': <h3> Closed</h3>,
//                                     '1': <h3> Stay</h3>,
//                                     '2': <h3> Go</h3>,
//                                     '3': <h3> Complete</h3>
//                                 }[products.status]}
//                                 <Button className=" mt-3 w-75 align-self-center ms" onClick={() => product.setSelectedOrder(products.id)}> Открыть </Button>
//                             </Col>
//                         </Row>

//                     </Row>
//                     {product.id === product.selectedOrder &&
//                             product.selectedOrder &&
//                                 <Row className="  row pb-1 m-3">
//                                     <Col className={"mt-3"}>id</Col>
//                                     <Col className={"mt-3"}>Name</Col>
//                                     <Col className={"mt-3"}>Price</Col>
//                                 </Row>
//                             }
//                     {product.id === product.selectedOrder &&
//                     product._orders_lists.map
//                     (product =>

//                         <Card className="  p-2 row m-3  ">
//                             <Row className="row">
//                                 <Col className={"mt-3"}>{product.product.id}</Col>
//                                 <Col className={"mt-3"}>{product.product.name}</Col>
//                                 <Col className={"mt-3"}>{product.product.price}</Col>
//                             </Row>
//                         </Card>
//                     )}
//                     {product.id === product.selectedOrder &&
//                     <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-1 m-3">
//                         <h1 className="align-self-end" >Всего:</h1>
//                         <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> руб </span></h3>
//                     </Card>}
//                 </Card>
//             )}

//         </Container>
//     );

// });

// export default Order;

import React, { useEffect, useRef } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../index';
import { fetchBrands, fetchLegal, fetchTypes, getOrder, getUserOrderList } from '../http/productAPI';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";

const Order = observer(() => {
    const { product } = useContext(Context);
    const { user } = useContext(Context);
    const { a } = useContext(Context);
    const [orderVisible, setOrderVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null); 

    const myRef = useRef(null);

    useEffect(() => {
        getOrder(user.isUser).then(data => product.setOrders(data));
        getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data));
    }, [product, product._selectedOrder, a]);

    // считаем общую сумму, которую юзер набрал в корзину
    let prices = 0;
    product._orders_lists.forEach(price => {
        prices += price.product.price;
    });

    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pt-5 pb-2">Все заказы</h1>

            {product.order.map(products => (
                <Card className="d-flex w-100 pb-3  m-3" key={products.id}>
                    <Row d-flex>
                        <Row className="row pb-1 m-3">
                            <Col className={"mt-3"}>Addressee</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Status</Col>
                        </Row>
                        <Row className="row pb-1 m-3 ">
                            <Col><h3>{products.addressee}</h3></Col>
                            <Col><h3>{products.postcode}</h3></Col>
                            <Col>
                                {{
                                    '0': <h3> Closed</h3>,
                                    '1': <h3> Stay</h3>,
                                    '2': <h3> Go</h3>,
                                    '3': <h3> Complete</h3>
                                }[products.status]}
                                <Button
                                    className=" mt-3 w-75 align-self-center ms"
                                    onClick={() => setSelectedOrderId(products.id)}
                                >
                                    Открыть
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                    {selectedOrderId === products.id && (
                        <>
                            <Row className="  row pb-1 m-3">
                                <Col className={"mt-3"}>id</Col>
                                <Col className={"mt-3"}>Name</Col>
                                <Col className={"mt-3"}>Price</Col>
                            </Row>
                            {product._orders_lists.map(orderList => (
                                <Card className="  p-2 row m-3" key={orderList.product.id}>
                                    <Row className="row">
                                        <Col className={"mt-3"}>{orderList.product.id}</Col>
                                        <Col className={"mt-3"}>{orderList.product.name}</Col>
                                        <Col className={"mt-3"}>{orderList.product.price}</Col>
                                    </Row>
                                </Card>
                            ))}
                            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-1 m-3">
                                <h1 className="align-self-end">Всего:</h1>
                                <h3 className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> руб </span></h3>
                            </Card>
                        </>
                    )}
                </Card>
            ))}
        </Container>
    );
});

export default Order;
