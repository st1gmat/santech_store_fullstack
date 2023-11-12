import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Dropdown, Col, Row } from 'react-bootstrap';
import { Context } from '../../index';

const CreateProduct = ({show, onHide}) => {
    const {product} = useContext(Context);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    // console.log(product.types);
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={3}>
                            <Dropdown className='mb-2'>
                                <Dropdown.Toggle variant="outline-dark">Выберите тип</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {product.types.map(type =>
                                        <Dropdown.Item key={type.id}> {type.name} </Dropdown.Item>    
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        
                        <Col md={3}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-dark">Выберите бренд</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {product.brands.map(brand =>
                                        <Dropdown.Item key={brand.id}> {brand.name} </Dropdown.Item>    
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        
                    </Row>
                    
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите название товара'в
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder='Введите стоимость товара'
                        type="number"
                    />
                    <Form.Control 
                        className='mt-3'
                        type="file"
                    />
                    <hr/>
                    <Button variant='outline-dark' onClick={addInfo}>Добавить новую характеристику</Button>
                    {info.map(i =>
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Введите название характеристики'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Введите описание характеристики'
                                />
                            </Col>
                            <Col md={4}>
                                <Button 
                                    variant='outline-danger'
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>    
                    )}            
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default CreateProduct;