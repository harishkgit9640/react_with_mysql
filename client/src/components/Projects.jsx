import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Pagination from './Pagination';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'pending',
        level: 'beginner',
        district: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchProjects = async (page = 1) => {
        try {
            const response = await axios.get(`/api/projects?page=${page}&limit=${itemsPerPage}`);
            setProjects(response.data.projects);
            setTotalPages(response.data.pagination.totalPages);
            setTotalItems(response.data.pagination.totalItems);
        } catch (error) {
            setError('Error fetching projects');
        }
    };

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // ... existing code ...

    return (
        <div className="container mt-4">
            <h2>Projects</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add New Project
            </Button>

            <Table striped bordered hover>
                {/* ... existing table code ... */}
            </Table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* ... existing modal code ... */}
        </div>
    );
};

export default Projects; 