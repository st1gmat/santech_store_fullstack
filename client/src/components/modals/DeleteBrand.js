import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { deleteBrand, fetchBrands } from '../../http/productAPI';

const DeleteBrand = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBrand(id);
      // Update the brands list after deletion
      const updatedBrands = brands.filter((brand) => brand.id !== id);
      setBrands(updatedBrands);
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  return (
    <div>
      <h2>Delete Brands</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <Button
                  onClick={() => handleDelete(brand.id)}
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

export default DeleteBrand;
