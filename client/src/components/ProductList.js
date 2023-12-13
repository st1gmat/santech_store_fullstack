// import React, {useContext} from 'react';
// import {observer} from "mobx-react-lite";
// import {Context} from "../index";
// import {Row} from "react-bootstrap";
// import ProductItem from "./ProductItem";

// const ProductList = observer(() => {
//     const {product} = useContext(Context)

//     return (

//         <Row className="d-flex">
//             {product.products.map(product =>

//                 <ProductItem key={product.id} product={product}/>
//             )}
//         </Row>
//     );
// });

// export default ProductList;
import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, ButtonGroup, Dropdown, Button } from "react-bootstrap";
import ProductItem from "./ProductItem";
import { sortProducts } from "../utils/processing"; // Импорт функции из файла processing.js

const ProductList = observer(() => {
    const { product } = useContext(Context);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortParam, setSortParam] = useState('name');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    // Используйте sortProducts из файла processing.js
    const sortProductsFunction = sortProducts(sortOrder, sortParam);

    return (
        <>
            {/* Сортировка и выбор параметров сортировки */}
            <ButtonGroup>
                <Button style={{marginRight:'15px', borderRadius:'2em', borderColor:'#808080'}} variant='Secondary' onClick={() => setSortOrder('asc')}>A..Z</Button>
                <Button style={{marginRight:'15px', borderRadius:'2em', borderColor:'#808080'}} variant='Secondary' onClick={() => setSortOrder('desc')}>Z..A</Button>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <Dropdown.Toggle caret>
                        Сортировка по
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortParam('name')}>Имени</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortParam('amount')}>Кол-во</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortParam('price')}>Цен</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>

            {/* Список продуктов */}
            <Row className="d-flex">
                {product.products.slice().sort(sortProductsFunction).map(product =>
                    <ProductItem key={product.id} product={product}/>
                )}
            </Row>
        </>
    );
});

export default ProductList;

