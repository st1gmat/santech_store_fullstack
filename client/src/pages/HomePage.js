import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import styles from './HomePage.module.css';


const HomePage = () => {
  return (
    <Container fluid className={styles.cardStyle}>
      <div className={styles.info}>
        <h1>Добро пожаловать в наш магазин сантехники!</h1>
        <p>
          Здесь вы найдете широкий ассортимент сантехники и аксессуаров для вашего дома.
          Мы предлагаем высококачественные продукты по доступным ценам.
        </p>
        <Button variant="primary">Посмотреть каталог</Button>
      </div>
        
    </Container>
  );
};

export default HomePage;
