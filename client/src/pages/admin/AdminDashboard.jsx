import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ViewProjectModal from '../admin/ViewProjectModal';
import EditProjectModal from '../admin/EditProjectModal';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const query_cond = (user.role !== "admin" ? user.district_name : "admin")

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects/all-projects/' + query_cond);
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  // status toggler
  const toggleUserStatus = async (project_id) => {
    try {
      await api.put('/projects/toggle-status/' + project_id);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling project status');
    }
  };

  // View project handler
  const handleView = async (project_id) => {
    try {
      const response = await api.get('/projects/get-project/' + project_id);
      if (response.data.success) {
        setSelectedProject(response.data.data);
        setShowViewModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching project details');
    }
  };

  // Edit project handler
  const handleEdit = async (project_id) => {
    try {
      const response = await api.get('/projects/get-project/' + project_id);
      if (response.data.success) {
        setSelectedProject(response.data.data);
        setShowEditModal(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching project details');
    }
  };

  // Update project handler
  const handleUpdate = async (project_id, formData) => {
    const response = await api.put('/projects/update-project/' + project_id, formData);
    if (response.data.success) {
      fetchProjects();
      return true;
    }
    throw new Error(response.data.message || 'Failed to update project');
  };

  const handleDelete = async (project_id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete('/projects/delete-project/' + project_id);
        fetchProjects();
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting project');
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

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container py-4">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Projects Dashboard</h3>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Level</th>
                  <th>District</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">No projects found</td>
                  </tr>
                ) : (
                  projects.map((project, index) => (
                    <tr key={project.id}>
                      <td>{index + 1}</td>
                      <td>{project.project_name}</td>
                      <td>{project.description}</td>
                      <td>{project.level}</td>
                      <td>{project.district_name || "NA"}</td>
                      <td>
                        <span
                          onClick={() => toggleUserStatus(project.id)}
                          className={`badge bg-${getStatusColor(project.status)} cursor-pointer`}
                          style={{ cursor: 'pointer' }}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td>{new Date(project.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleView(project.id)}
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(project.id)}
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(project.id)}
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

      {/* View Project Modal */}
      <ViewProjectModal
        show={showViewModal}
        onHide={() => {
          setShowViewModal(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onUpdate={handleUpdate}
      />
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
    case 'completed':
      return 'info';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default AdminDashboard;