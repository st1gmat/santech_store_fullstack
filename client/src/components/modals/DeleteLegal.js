import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteLegal, fetchLegal } from '../../http/productAPI';

const DeleteLegal = () => {
  const [legals, setLegals] = useState([]);

  useEffect(() => {
    fetchLegal().then((data) => setLegals(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLegal(id);
      const updatedTypes = legals.filter((legal) => legal.id !== id);
      setLegals(updatedTypes);
    } catch (error) {
      console.error('Error deleting legal:', error);
    }
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
          {legals.map((type) => (
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

export default DeleteLegal;
