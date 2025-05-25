import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const ViewUserModal = ({ show, onHide, user }) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>{user.role}</td>
                        </tr>
                        <tr>
                            <th>District</th>
                            <td>{user.district_name || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <span className={`badge bg-${getStatusColor(user.status)}`}>
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                        {user.profile_picture && (
                            <tr>
                                <th>Profile Picture</th>
                                <td>
                                    <img
                                        src={`http://localhost:5000/${user.profile_picture}`}
                                        alt="Profile"
                                        className="img-thumbnail"
                                        style={{ maxWidth: '150px' }}
                                    />
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th>Member Since</th>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

// Helper function to get status color
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'active':
            return 'success';
        case 'pending':
            return 'warning';
        case 'inactive':
            return 'danger';
        default:
            return 'secondary';
    }
};

export default ViewUserModal; 