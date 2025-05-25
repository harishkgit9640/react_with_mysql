import React from 'react';
import { Modal, Table } from 'react-bootstrap';

const ViewProjectModal = ({ show, onHide, project }) => {
    if (!project) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Project Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <th>Project Name</th>
                            <td>{project.project_name}</td>
                        </tr>
                        <tr>
                            <th>Project URL</th>
                            <td>
                                {project.project_url ? (
                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                        {project.project_url}
                                    </a>
                                ) : 'Not specified'}
                            </td>
                        </tr>
                        <tr>
                            <th>Level</th>
                            <td>{project.level}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{project.status}</td>
                        </tr>
                        <tr>
                            <th>District</th>
                            <td>{project.district_name || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{project.description || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>District Login Available</th>
                            <td>{project.dist_login_avl}</td>
                        </tr>
                        {project.dist_login_avl === 'Yes' && (
                            <>
                                <tr>
                                    <th>Nodal Office</th>
                                    <td>{project.nodal_office || 'Not specified'}</td>
                                </tr>
                                <tr>
                                    <th>Nodal Contact No</th>
                                    <td>{project.nodal_contact_no || 'Not specified'}</td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <th>DIO ID Available</th>
                            <td>{project.dio_id_avl}</td>
                        </tr>
                        {project.dio_id_avl === 'Yes' && (
                            <tr>
                                <th>DIO ID</th>
                                <td>{project.dio_id || 'Not specified'}</td>
                            </tr>
                        )}
                        <tr>
                            <th>Manpower Available</th>
                            <td>{project.manpower_avl}</td>
                        </tr>
                        {project.manpower_avl === 'Yes' && (
                            <>
                                <tr>
                                    <th>Manpower Name</th>
                                    <td>{project.mp_name || 'Not specified'}</td>
                                </tr>
                                <tr>
                                    <th>Manpower Post</th>
                                    <td>{project.mp_post || 'Not specified'}</td>
                                </tr>
                                <tr>
                                    <th>Manpower Contact No</th>
                                    <td>{project.mp_contact_no || 'Not specified'}</td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <th>SPC Name</th>
                            <td>{project.spc_name || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Handling Officer</th>
                            <td>{project.handling_officer || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Contact No</th>
                            <td>{project.contact_no || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Remarks</th>
                            <td>{project.remarks || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{new Date(project.created_at).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default ViewProjectModal; 