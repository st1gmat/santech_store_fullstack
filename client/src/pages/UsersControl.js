import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button } from 'react-bootstrap';
import { getAllUsers, deleteUserById } from '../http/userAPI';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal'
const UserControl = observer(() => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setselectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await getAllUsers();
            // Filter users with the role 'USER'
            const filteredUsers = usersData.filter(user => user.role === 'USER');
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUserById(userId);
            // Refresh the user list after deletion
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleShowModal = (id) => {
        setselectedUserId(id);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setselectedUserId(null);
        setShowModal(false);
    };
    return (
        <div>
            <h1>User Control</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleShowModal(user.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeleteConfirmationModal
                show={showModal}
                onHide={handleCloseModal}
                onDelete={() => handleDeleteUser(selectedUserId)}
                productName={users.find((user) => user.id === selectedUserId)?.name}
            />
        </div>
    );
});

export default UserControl;
