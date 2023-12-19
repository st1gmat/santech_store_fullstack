import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Form } from 'react-bootstrap';

const SortBar = observer(() => {
    const { product } = useContext(Context);

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        product.setSort(selectedSort);
    };

    return (
        <Form style={{ marginTop: '75px' }}>
            <Form.Group controlId="sortSelect">
                <Form.Label>Сортировать по:</Form.Label>
                <Form.Control as="select" onChange={handleSortChange} value={product.sort}>
                    <option value="alphabetical">Алфавиту</option>
                    <option value="amount">Количеству товара</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );
});

export default SortBar;
