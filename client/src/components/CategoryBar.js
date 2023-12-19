import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import {ListGroup } from 'react-bootstrap';

const CategoryBar = observer(() => {
  const { product } = useContext(Context);

  return (
    <>
    <ListGroup style={{marginTop:'75px'}}>
        {product.categories.map(category =>
            <ListGroup.Item
                style={{cursor: 'pointer'}}
                active={category.id === product.selectedCategory.id}
                onClick={() => product.SetSelectedCategory(category)}
                key={category.id}
            >
                {console.log(product.selectedCategory)}
                {category.name}
                <br/>
            </ListGroup.Item>
            
        )}
    </ListGroup>

    </>
    );
});

export default CategoryBar;
