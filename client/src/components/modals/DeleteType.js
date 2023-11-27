import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteType, fetchTypes } from '../../http/productAPI';

const DeleteType = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteType(id);
      // Update the types list after deletion
      const updatedTypes = types.filter((type) => type.id !== id);
      setTypes(updatedTypes);
    } catch (error) {
      console.error('Error deleting type:', error);
    }
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
                  onClick={() => handleDelete(type.id)}
                  variant={'outline-danger'}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeleteType;
