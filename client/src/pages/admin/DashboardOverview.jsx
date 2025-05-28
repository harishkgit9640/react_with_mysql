import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaUsers, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import api from '../../services/api';

const DashboardOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await api.get('/auth/dashboard-stats');
            if (response.data.success) {
                setStats(response.data.data);
            } else {
                setError('Failed to fetch dashboard statistics');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching dashboard statistics');
        } finally {
            setLoading(false);
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
            <h2 className="mb-4">Dashboard Overview</h2>
            <Row>

                {/* Projects Stats */}
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-lg bg-success bg-opacity-50">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Total Projects</h6>
                                    <h3 className="mb-0">{stats.projects.total_projects}</h3>
                                    <div className="mt-2">
                                        <span className="text-success me-3">
                                            Active: {stats.projects.active_projects}
                                        </span>
                                        <span className="text-danger">
                                            Inactive: {stats.projects.inactive_projects}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-success bg-opacity-50 p-3 rounded">
                                    <FaProjectDiagram className="text-success" size={30} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>


                {/* Users Stats */}
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-lg bg-primary bg-opacity-50">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Total Users</h6>
                                    <h3 className="mb-0">{stats.users.total_users}</h3>
                                    <div className="mt-2">
                                        <span className="text-success me-3">
                                            Active: {stats.users.active_users}
                                        </span>
                                        <span className="text-danger">
                                            Inactive: {stats.users.inactive_users}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-primary bg-opacity-50 p-3 rounded">
                                    <FaUsers className="text-primary" size={30} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>


                {/* Contacts Stats */}
                <Col md={4} className="mb-4">
                    <Card className="h-100 shadow-lg bg-info bg-opacity-50">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Total Contacts</h6>
                                    <h3 className="mb-0">{stats.contacts.total_contacts}</h3>
                                </div>
                                <div className="bg-info bg-opacity-50 p-3 rounded">
                                    <FaEnvelope className="text-info" size={30} />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardOverview; 