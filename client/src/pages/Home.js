import React, {useContext, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import styles from './Home.module.css'
import Button from 'react-bootstrap/Button'
import { SHOP_ROUTE } from '../utils/consts'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import {fetchBrands, fetchProducts, fetchTypes} from "../http/productAPI";
import Pages from '../components/Pages'


const Home = observer(() => {
  const history = useNavigate();
  const {user} = useContext(Context)
  const {product} = useContext(Context)

  useEffect(() => {
      fetchTypes().then(data => product.setTypes(data))
      fetchBrands().then(data => product.setBrands(data))
      fetchProducts(null, null, product.page, product.limit).then(data => {
          product.setProducts(data.rows)
          product.setTotalCount(data.count)
      })
  }, [])

  useEffect(() => {
      fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then(data => {
          product.setProducts(data.rows)
          product.setTotalCount(data.count)
      })
  }, [product.page, product.selectedType, product.selectedBrand,])


  return (
    <section>
      <div className={styles.headerSection}>
      
        <div className={styles.contInfo}>
          <Card className={styles.cardBox}>
              <h1>Welcome to Our Store</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facer upiditate veniam porro. Dolorum repudiandae tempore, obcaecati minus a optio harum inventore tempora ab!</p>
              <div className='mt-2'>
                <Button variant="outline-light" className="mr-4 " onClick={() => history(SHOP_ROUTE)}>Shop Now</Button>
              </div>
          </Card>
        </div>
      </div>
      <div className='m-5'>
        <h1 className='text-center'>Каталог</h1>
        <Container className='d-flex justify-content-center'>
            <ProductList />
        </Container>
        <Container>
          <Pages/>

        </Container>

      </div>
      
    </section>
    
    

  )
})

export default Home