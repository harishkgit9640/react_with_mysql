// AddProject.jsx
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AddProjectModal = ({ show, onHide, onSuccess }) => {
    const [formData, setFormData] = useState({
        project_name: '',
        project_url: '',
        level: '',
        status: '',
        implemented_in_dist: '',
        district_name: '',
        description: '',
        dist_login_avl: 'No',
        nodal_office: '',
        nodal_contact_no: '',
        dio_id_avl: 'No',
        dio_id: '',
        manpower_avl: 'No',
        mp_name: '',
        mp_post: '',
        mp_contact_no: '',
        spc_name: '',
        handling_officer: '',
        contact_no: '',
        remarks: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.project_name?.trim()) {
            newErrors.project_name = 'Project name is required';
        }
        if (!formData.level?.trim()) {
            newErrors.level = 'Level is required';
        }
        if (!formData.status?.trim()) {
            newErrors.status = 'Status is required';
        }
        // check mobile number should be 10 digits and only accept number
        // const phoneFields = ['nodal_contact_no', 'mp_contact_no', 'contact_no'];
        // phoneFields.forEach(field => {
        //     if (formData[field] && (!/^\d{10}$/.test(formData[field]))) {
        //         newErrors[field] = `${field.replace('_', ' ')} should be 10 digits and numeric`;
        //     }
        // });


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await api.post('/projects/create-project', formData);
            if (response.data.success) {
                // Reset form
                setFormData({
                    project_name: '',
                    project_url: '',
                    level: '',
                    status: '',
                    implemented_in_dist: '',
                    district_name: '',
                    description: '',
                    dist_login_avl: 'No',
                    nodal_office: '',
                    nodal_contact_no: '',
                    dio_id_avl: 'No',
                    dio_id: '',
                    manpower_avl: 'No',
                    mp_name: '',
                    mp_post: '',
                    mp_contact_no: '',
                    spc_name: '',
                    handling_officer: '',
                    contact_no: '',
                    remarks: '',
                });
                setErrors({});
                onSuccess?.(); // Call the success callback
                onHide(); // Close the modal
            }
        } catch (err) {
            setErrors({
                general: err.response?.data?.message || 'Failed to create project'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            project_name: '',
            project_url: '',
            level: '',
            status: '',
            implemented_in_dist: '',
            district_name: '',
            description: '',
            dist_login_avl: 'No',
            nodal_office: '',
            nodal_contact_no: '',
            dio_id_avl: 'No',
            dio_id: '',
            manpower_avl: 'No',
            mp_name: '',
            mp_post: '',
            mp_contact_no: '',
            spc_name: '',
            handling_officer: '',
            contact_no: '',
            remarks: '',
        });
        setErrors({});
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errors.general && (
                    <Alert variant="danger" className="mb-3">
                        {errors.general}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.project_name}
                                    placeholder="Enter project name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.project_name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Project URL</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="project_url"
                                    value={formData.project_url}
                                    onChange={handleChange}
                                    placeholder="Enter project URL"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Level</Form.Label>
                                <Form.Select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    isInvalid={!!errors.level}
                                    required
                                >
                                    <option value="">Select Level</option>
                                    <option value="Central">Central</option>
                                    <option value="State">State</option>
                                    <option value="District">District</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.level}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    isInvalid={!!errors.status}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.status}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Implemented in District?</Form.Label>
                                <Form.Select
                                    name="implemented_in_dist"
                                    value={formData.implemented_in_dist}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>District Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="district_name"
                                    value={formData.district_name}
                                    onChange={handleChange}
                                    placeholder="Enter district name"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12">
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter project description"
                                    rows={3}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>District Login Available?</Form.Label>
                                <Form.Select
                                    name="dist_login_avl"
                                    value={formData.dist_login_avl}
                                    onChange={handleChange}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        {formData.dist_login_avl === 'Yes' && (
                            <>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Nodal Office</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nodal_office"
                                            value={formData.nodal_office}
                                            onChange={handleChange}
                                            placeholder="Enter nodal office"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Nodal Contact No</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="nodal_contact_no"
                                            value={formData.nodal_contact_no}
                                            onChange={handleChange}
                                            placeholder="Enter nodal contact number"
                                        />
                                    </Form.Group>
                                </div>
                            </>
                        )}
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>DIO ID Available?</Form.Label>
                                <Form.Select
                                    name="dio_id_avl"
                                    value={formData.dio_id_avl}
                                    onChange={handleChange}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        {formData.dio_id_avl === 'Yes' && (
                            <div className="col-md-4">
                                <Form.Group>
                                    <Form.Label>DIO ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dio_id"
                                        value={formData.dio_id}
                                        onChange={handleChange}
                                        placeholder="Enter DIO ID"
                                    />
                                </Form.Group>
                            </div>
                        )}
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Manpower Available?</Form.Label>
                                <Form.Select
                                    name="manpower_avl"
                                    value={formData.manpower_avl}
                                    onChange={handleChange}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        {formData.manpower_avl === 'Yes' && (
                            <>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Manpower Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mp_name"
                                            value={formData.mp_name}
                                            onChange={handleChange}
                                            placeholder="Enter manpower name"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Manpower Post</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mp_post"
                                            value={formData.mp_post}
                                            onChange={handleChange}
                                            placeholder="Enter manpower post"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Manpower Contact No</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="mp_contact_no"
                                            value={formData.mp_contact_no}
                                            onChange={handleChange}
                                            placeholder="Enter manpower contact number"
                                        />
                                    </Form.Group>
                                </div>
                            </>
                        )}
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>SPC Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="spc_name"
                                    value={formData.spc_name}
                                    onChange={handleChange}
                                    placeholder="Enter SPC name"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Handling Officer</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="handling_officer"
                                    value={formData.handling_officer}
                                    onChange={handleChange}
                                    placeholder="Enter handling officer name"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="contact_no"
                                    value={formData.contact_no}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-12">
                            <Form.Group>
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    placeholder="Enter remarks"
                                    rows={3}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Adding...
                                </>
                            ) : (
                                'Add Project'
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProjectModal;
