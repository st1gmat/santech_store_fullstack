import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteType, fetchTypes } from '../../http/productAPI';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const DeleteType = () => {
  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteType(id);
      const updatedTypes = types.filter((type) => type.id !== id);
      setTypes(updatedTypes);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedTypeId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTypeId(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Delete Types</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>
                <Button
                  onClick={() => handleShowModal(type.id)}
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
        onDelete={() => handleDelete(selectedTypeId)}
        productName={types.find((type) => type.id === selectedTypeId)?.name}
      />
    </div>
  );
};

export default DeleteType;
