import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteCategory, fetchCategory } from '../../http/productAPI';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategory().then((data) => setCategories(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      // Update the categories list after deletion
      const updatedCategories = categories.filter((category) => category.id !== id);
      setCategories(updatedCategories);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategoryId(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Delete Categories</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button
                  onClick={() => handleShowModal(category.id)}
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
        onDelete={() => handleDelete(selectedCategoryId)}
        productName={categories.find((category) => category.id === selectedCategoryId)?.name}
      />
    </div>
  );
};

export default DeleteCategory;
