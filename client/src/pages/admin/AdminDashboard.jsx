import React, { useState, useEffect } from 'react';
import { Table, Card, Spinner, Alert, Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ViewProjectModal from '../admin/ViewProjectModal';
import EditProjectModal from '../admin/EditProjectModal';
import AddProjectModal from '../admin/AddProject';
import {FaTrash, FaPlus, FaEye, FaPencilAlt} from 'react-icons/fa';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const isAdmin = user?.role === "admin";
  const query_cond = (!isAdmin ? user.district_name : "admin");

  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    level: '',
    district: '',
    search: ''
  });

  // Unique values for filters
  const [uniqueDistricts, setUniqueDistricts] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Apply filters whenever projects or filters change
    applyFilters();
  }, [projects, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects/all-projects/' + query_cond);
      if (response.data.success) {
        setProjects(response.data.data);
        // Extract unique districts
        const districts = [...new Set(response.data.data
          .map(project => project.district_name)
          .filter(district => district))];
        setUniqueDistricts(districts);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(project => 
        project.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply level filter
    if (filters.level) {
      filtered = filtered.filter(project => 
        project.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    // Apply district filter
    if (filters.district) {
      filtered = filtered.filter(project => 
        project.district_name === filters.district
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project =>
        project.project_name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProjects(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      level: '',
      district: '',
      search: ''
    });
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
      {/* Projects Table */}
      <Card className="mt-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Projects Management</h3>
          {isAdmin && (
            <Button
              variant="light"
              onClick={() => setShowAddModal(true)}
              className="d-flex align-items-center gap-2"
            >
              <FaPlus/> Add New Project
            </Button>
          )}
        </Card.Header>
        <Card.Body>
          {/* Filters */}
          <div className="mb-4">
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    name="level"
                    value={filters.level}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Levels</option>
                    <option value="Central">Central</option>
                    <option value="State">State</option>
                    <option value="District">District</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>District</Form.Label>
                  <Form.Select
                    name="district"
                    value={filters.district}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Districts</option>
                    {uniqueDistricts.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search projects..."
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Level</th>
                    <th>District</th>
                    {isAdmin && <th>Status</th>}
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">No projects found</td>
                    </tr>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <tr key={project.id}>
                        <td>{index + 1}</td>
                        <td>{project.project_name}</td>
                        <td>{project.description}</td>
                        <td>{project.level}</td>
                        <td>{project.district_name || "NA"}</td>
                        {isAdmin && (
                          <td>
                            <span
                              onClick={() => toggleUserStatus(project.id)}
                              className={`badge bg-${getStatusColor(project.status)} cursor-pointer`}
                              style={{ cursor: 'pointer' }}
                            >
                              {project.status}
                            </span>
                          </td>
                        )}
                        <td>{new Date(project.created_at).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => handleView(project.id)}
                          >
                            <FaEye/> View
                          </button>
                          {isAdmin && (
                            <>
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => handleEdit(project.id)}
                              >
                              <FaPencilAlt /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(project.id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
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

      {/* Add Project Modal */}
      <AddProjectModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => {
          fetchProjects();
          setShowAddModal(false);
        }}
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