import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { Context } from '../index';
import { Row, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { sortProducts } from '../utils/processing';

const ProductList = observer(() => {
  const { product, user } = useContext(Context);
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortParam, setSortParam] = useState('name');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const sortProductsFunction = sortProducts(sortOrder, sortParam);


  const isShopRoute = location.pathname === '/shop'; 

  return (
    <>
      {isShopRoute && (
        <ButtonGroup>
          <Button
            style={{ marginRight: '15px', borderRadius: '2em', borderColor: '#808080' }}
            variant="secondary"
            onClick={() => setSortOrder('asc')}
          >
            A..Z
          </Button>
          <Button
            style={{ marginRight: '15px', borderRadius: '2em', borderColor: '#808080' }}
            variant="secondary"
            onClick={() => setSortOrder('desc')}
          >
            Z..A
          </Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <Dropdown.Toggle caret>Сортировка по</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortParam('name')}>Имени</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortParam('amount')}>Кол-во</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortParam('price')}>Цене</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      )}

      <Row className="d-flex">
        {product.products.slice().sort(sortProductsFunction).map(product => (
          <ProductItem key={product.id} product={product} user={user} />
        ))}
      </Row>
    </>
  );
});

export default ProductList;
