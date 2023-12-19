import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchCategory, fetchProducts, fetchTypes} from "../http/productAPI";
import Pages from "../components/Pages";
import CategoryBar from '../components/CategoryBar';


const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchCategory().then(data => product.setCategories(data))
        fetchProducts(null, null, null, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [])

    console.log(product.products);

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id, product.selectedCategory.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page, product.selectedType, product.selectedBrand, product.selectedCategory])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                    <CategoryBar />
                </Col>
                <Col md={9}>
                    <BrandBar/> 
                    <ProductList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );

});

export default Shop;
