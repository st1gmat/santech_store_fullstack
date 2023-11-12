import React from 'react'
import { Container, Col, Image, Card, Row, Button } from 'react-bootstrap'

const ProductPage = () => {

  const product = {
    id: 1,
    name: "GROHE Minta",
    price: 41790,
    rating: 0,
    // img: "1b3d3039-7a0d-4ad5-ac26-90e01f3f36c2.jpg",
    img: "https://annaoliver.uk/wp-content/uploads/2016/02/Medium-Circle-400x400.png",
  }
  const description = [
    {id: 1, title: 'Тип', description: 'Хром'},
    {id: 2, title: 'Бла', description: 'Бла'},
    {id: 3, title: 'Уникальная соврменнная гениальная', description: 'Хром'},
    {id: 4, title: 'Уникальная соврменнная гениальная', description: 'Хром'}
  ]
  return (
    <Container className='mt-5 ms-6 d-flex'>
      <Col md={6}>
        <Image width={500} height={500} src={product.img}/>
      </Col>
      <Col md={6}>
        <Card style={{height:"500px", padding:"20px"}} border='dark'>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>{product.name}</h2>
            <div>
              <span className='fs-5'>{product.rating}</span>
              <svg width={30} height={30} className='mt-2'>
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
              </svg>
            </div>
           
          </div>
          <div className='mt-1 fs-1 justify-content-between d-flex'>
            <span>Цена:</span>
            <div className='ms-0'>{product.price} ₽</div> 
          </div>
          <Button variant='outline-dark' className='mt-3'>Добавить в корзину</Button>
          <div className='mt-4'>
            <span className='fs-4'>Характеристики</span>
              
            {description.map(info => 
              <Row key={info.id}>
                {info.title}: {info.description}
              </Row>  
            )}
          </div>
          

        </Card>
      </Col>
    </Container>
  )
}

export default ProductPage