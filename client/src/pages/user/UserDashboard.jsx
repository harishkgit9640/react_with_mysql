import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import api from '../../services/api';
import Form from '../../components/Form';
import ViewUserModal from '../../components/ViewUserModal';

const UserDashboard = () => {
  // Modal and form states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district_name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/get-users');
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setErrors({ general: 'Failed to fetch users' });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Error fetching users' });
    } finally {
      setLoading(false);
    }
  };

  // status toggler
  const toggleUserStatus = async (user_id) => {
    try {
      await api.put('/auth/toggle-status/' + user_id);
      fetchAllUser();
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Error toggling user status' });
    }
  };

  // View user handler
  const handleView = async (userId) => {
    try {
      const response = await api.get(`/auth/get-user/${userId}`);
      if (response.data.success) {
        setSelectedUser(response.data.data);
        setShowViewModal(true);
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Error fetching user details' });
    }
  };

  // Edit handlers
  const handleEdit = async (userId) => {
    try {
      const response = await api.get(`/auth/get-user/${userId}`);
      if (response.data.success) {
        const userData = response.data.data;
        setSelectedUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          district_name: userData.district_name
        });
        setShowEditModal(true);
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Error fetching user details' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.put(`/auth/update-profile/${selectedUser.id}`, formData);
      if (response.data.success) {
        setSubmitStatus('success');
        fetchAllUser();
        setTimeout(() => {
          setShowEditModal(false);
          setSubmitStatus(null);
        }, 1500);
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrors({ general: err.response?.data?.message || 'Failed to update user' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (user_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete('/auth/delete-user/' + user_id);
        fetchAllUser();
      } catch (err) {
        setErrors({ general: err.response?.data?.message || 'Error deleting user' });
      }
    }
  };

  // Form fields configuration
  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter user name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter user email'
    },
    {
      name: 'district_name',
      label: 'District Name',
      type: 'text',
      placeholder: 'Enter user District Name'
    }
  ];

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
          <h3 className="mb-0">User Dashboard</h3>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>District</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No users found</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.district_name}</td>
                      <td>
                        <span
                          onClick={() => toggleUserStatus(user.id)}
                          className={`badge bg-${getStatusColor(user.status)} cursor-pointer`}
                          style={{ cursor: 'pointer' }}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleView(user.id)}
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(user.id)}
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
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

      {/* View User Modal */}
      <ViewUserModal
        show={showViewModal}
        onHide={() => {
          setShowViewModal(false);
          setSelectedUser(null);
          setErrors({});
        }}
        user={selectedUser}
      />

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => {
        setShowEditModal(false);
        setSelectedUser(null);
        setErrors({});
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            fields={formFields}
            submitButtonText="Update User"
          />
        </Modal.Body>
      </Modal>
    </div>
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

export default UserDashboard;