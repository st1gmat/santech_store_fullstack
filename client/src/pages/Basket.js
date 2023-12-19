import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../';
import { addToBasket, deleteFromBasket, getBasket, getUserOrder, getUserOrderList } from '../http/productAPI';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import CreateOrder from '../components/modals/CreateOrder';
import Image from 'react-bootstrap/Image';

const Basket = observer(() => {
  const { product, user, a } = useContext(Context);
  const [orderVisible, setOrderVisible] = useState(false);

  useEffect(() => {
    try {
      getBasket().then(data => product.setBaskets(data));
      getUserOrder(user.isUser).then(data => product.setOrders(data));
      getUserOrderList(product._selectedOrder).then(data => product.setOrdersList(data));
    } catch (e) {
      console.error(e);
    }
  }, [product, product._selectedOrder, a]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleDelete = (id) => {
    try {
      deleteFromBasket(id)
        .then(() => alert('Товар удален из корзины'))
        .then(() => refreshPage());
    } catch (e) {
      console.error(e);
    }
  };

  // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

  let totalPrices = 0;
  product.basket.forEach(price => (totalPrices += price.product.price));

  let totalPrices2 = 0;
  product._orders_lists.forEach(price => (totalPrices2 += price.product.price));

  return (
    <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
      <h1 className="pb-2">Корзина</h1>

      {/* ------- Считаем общую сумму ------- */}

      <Card className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
        <h1 className="align-self-end">Всего:</h1>
        <h3 className="ms-3 align-self-end">
          {totalPrices}
          <span className="font-weight-light pl-2"> руб. </span>
        </h3>
      </Card>
      {product.basket.map(currentProduct => (
        <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={currentProduct.id}>
          <Row>
            <Col md="2" className="d-inline-flex flex-row">
              <div className="flex-row">
                <Image src={process.env.REACT_APP_API_URL + currentProduct.product.img} alt="img not found" height={100} />
              </div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="flex-row">
                <h1 className="ms-3">{currentProduct.product.name}</h1>
              </div>
            </Col>
            <Col className="d-flex flex-row justify-content-end">
              <div className="flex-row">
                <h2 className="font-weight-light">{currentProduct.product.price} руб. </h2>
              </div>
            </Col>
            <Col className="d-flex flex-row justify-content-end">
              <div className="flex-row">
                <Button className="bg-danger" onClick={() => handleDelete(currentProduct.id)}>
                  Удалить
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      ))}

      <Row>
        <Button className="bg-success" onClick={() => setOrderVisible(true)}>
          Отправить заказ
        </Button>
      </Row>

      <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)} />
    </Container>
  );
});

export default Basket;
