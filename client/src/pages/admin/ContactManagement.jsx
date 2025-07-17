import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert, Modal, Fade } from 'react-bootstrap';
import api from '../../services/api';
import { FaTrash, FaEye } from 'react-icons/fa';

const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [selectedContact, setSelectedContact] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/contacts/get-contacts/');
            if (response.data.success) {
                setContacts(response.data.data);
            } else {
                setErrors({ general: 'Failed to fetch contacts' });
            }
        } catch (err) {
            setErrors({ general: err.response?.data?.message || 'Error fetching contacts' });
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (contactId) => {
        try {
            const response = await api.get(`/contacts/get-contact/${contactId}`);
            if (response.data.success) {
                setSelectedContact(response.data.data);
                setShowViewModal(true);
            }
        } catch (err) {
            setErrors({ general: err.response?.data?.message || 'Error fetching contact details' });
        }
    };

    const handleDelete = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact message?')) {
            try {
                await api.delete(`/contacts/delete-contact/${contactId}`);
                fetchContacts();
            } catch (err) {
                setErrors({ general: err.response?.data?.message || 'Error deleting contact' });
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (errors.general) {
        return (
            <Alert variant="danger" className="m-3">
                {errors.general}
            </Alert>
        );
    }

    return (
        <div className="container py-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <h3 className="mb-0">Contact Messages</h3>
                </Card.Header>
                <Card.Body>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No contact messages found</td>
                                    </tr>
                                ) : (
                                    contacts.map((contact, index) => (
                                        <tr key={contact.id}>
                                            <td>{index + 1}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject || 'No subject'}</td>
                                            <td>{new Date(contact.created_at).toLocaleString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-info me-2"
                                                    onClick={() => handleView(contact.id)}
                                                >
                                                    <FaEye /> View
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(contact.id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            {/* View Contact Modal */}
            <Modal show={showViewModal} onHide={() => {
                setShowViewModal(false);
                setSelectedContact(null);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Message Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedContact && (
                        <div>
                            <p><strong>Name:</strong> {selectedContact.name}</p>
                            <p><strong>Email:</strong> {selectedContact.email}</p>
                            <p><strong>Subject:</strong> {selectedContact.subject || 'No subject'}</p>
                            <p><strong>Message:</strong></p>
                            <div className="border p-3 rounded bg-light">
                                {selectedContact.message}
                            </div>
                            <p className="mt-3">
                                <strong>Received:</strong> {new Date(selectedContact.created_at).toLocaleString()}
                            </p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ContactManagement; 