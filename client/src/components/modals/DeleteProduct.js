import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fullDeleteProduct, fetchAllProducts } from '../../http/productAPI';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAllProducts().then((data) => setProducts(data));
    }, []);

    const handleDelete = async (id) => {
        try {
        await fullDeleteProduct(id);
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        handleCloseModal();
        } catch (error) {
        console.error('Error deleting product:', error);
        }
    };

    const handleShowModal = (id) => {
        setSelectedProductId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProductId(null);
        setShowModal(false);
    };

    return (
        <div>
        <h2>Delete Products</h2>
        <Table striped bordered hover className="mt-4">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                    <Button
                    onClick={() => handleShowModal(product.id)}
                    variant={'outline-danger'}
                    >
                    Удалить
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>

        <DeleteConfirmationModal
            show={showModal}
            onHide={handleCloseModal}
            onDelete={() => handleDelete(selectedProductId)}
            productName={products.find((product) => product.id === selectedProductId)?.name}
        />
        </div>
    );
};

export default DeleteProduct;
