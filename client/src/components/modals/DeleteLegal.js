import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteLegal, fetchLegal } from '../../http/productAPI';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import your modal component

const DeleteLegal = () => {
  const [legals, setLegals] = useState([]);
  const [selectedLegalId, setSelectedLegalId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLegal().then((data) => setLegals(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLegal(id);
      const updatedLegals = legals.filter((legal) => legal.id !== id);
      setLegals(updatedLegals);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting legal:', error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedLegalId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedLegalId(null);
    setShowModal(false);
  };

  return (
    <div className='mt-3'>
      <hr />
      <h2>Delete Legals</h2>
      <hr />

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {legals.map((legal) => (
            <tr key={legal.id}>
              <td>{legal.id}</td>
              <td>{legal.name}</td>
              <td>
                <Button
                  onClick={() => handleShowModal(legal.id)}
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
        onDelete={() => handleDelete(selectedLegalId)}
        productName={legals.find((legal) => legal.id === selectedLegalId)?.name}
      />
    </div>
  );
};

export default DeleteLegal;
