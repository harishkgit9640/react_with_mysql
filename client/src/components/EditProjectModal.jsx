import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const EditProjectModal = ({ show, onHide, project, onUpdate }) => {
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

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData({
                project_name: project.project_name || '',
                project_url: project.project_url || '',
                level: project.level || '',
                status: project.status || '',
                implemented_in_dist: project.implemented_in_dist || '',
                district_name: project.district_name || '',
                description: project.description || '',
                dist_login_avl: project.dist_login_avl || 'No',
                nodal_office: project.nodal_office || '',
                nodal_contact_no: project.nodal_contact_no || '',
                dio_id_avl: project.dio_id_avl || 'No',
                dio_id: project.dio_id || '',
                manpower_avl: project.manpower_avl || 'No',
                mp_name: project.mp_name || '',
                mp_post: project.mp_post || '',
                mp_contact_no: project.mp_contact_no || '',
                spc_name: project.spc_name || '',
                handling_officer: project.handling_officer || '',
                contact_no: project.contact_no || '',
                remarks: project.remarks || '',
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await onUpdate(project.id, formData);
            onHide();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update project');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
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
                                    required
                                />
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
                                    required
                                >
                                    <option value="">Select Level</option>
                                    <option value="Central">Central</option>
                                    <option value="State">State</option>
                                    <option value="District">District</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Form.Select>
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
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="district_name"
                                    value={formData.district_name}
                                    onChange={handleChange}
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
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Nodal Contact No</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nodal_contact_no"
                                            value={formData.nodal_contact_no}
                                            onChange={handleChange}
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
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group>
                                        <Form.Label>Manpower Contact No</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mp_contact_no"
                                            value={formData.mp_contact_no}
                                            onChange={handleChange}
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
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contact_no"
                                    value={formData.contact_no}
                                    onChange={handleChange}
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
                                    rows={3}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Project'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProjectModal; 