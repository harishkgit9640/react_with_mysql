// AddProject.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const AddProject = () => {
    const [formData, setFormData] = useState({
        project_name: '',
        project_url: '',
        level: '',
        status: '',
        implemented_in_dist: '',
        District: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.project_name || !formData.level || !formData.status) {
            alert('Please fill all required fields.');
            return;
        }
        console.log('Submitted Data:', formData);
        const res = await api.post('/projects/create-project', formData);
        console.log(res.data);
    };

    return (
        <div className="container py-5">
            <div className="justify-content-center border rounded p-3">
                <form onSubmit={handleSubmit} className="mx-auto">
                    <h2 className="text-xl font-bold my-3">Add Project</h2>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                name="project_name"
                                placeholder="Project Name"
                                value={formData.project_name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                name="project_url"
                                placeholder="Project URL"
                                value={formData.project_url}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-2">
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">Select Level</option>
                                <option value="Central">Central</option>
                                <option value="State">State</option>
                                <option value="District">District</option>
                            </select>
                        </div>


                        <div className="col-md-4">
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="implemented_in_dist"
                                value={formData.implemented_in_dist}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Implemented in District?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <input
                                name="District"
                                placeholder="District"
                                value={formData.District}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                name="dist_login_avl"
                                value={formData.dist_login_avl}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="No">District Login Available?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {formData.dist_login_avl === 'Yes' && (
                            <>
                                <div className="col-md-4">

                                    <input
                                        name="nodal_office"
                                        placeholder="Nodal Office"
                                        value={formData.nodal_office}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        name="nodal_contact_no"
                                        placeholder="Nodal Contact No"
                                        value={formData.nodal_contact_no}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                            </>
                        )}

                        <div className="col-md-4">
                            <select
                                name="dio_id_avl"
                                value={formData.dio_id_avl}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="No">DIO ID Available?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {formData.dio_id_avl === 'Yes' && (
                            <div className="col-md-4">

                                <input
                                    name="dio_id"
                                    placeholder="DIO ID"
                                    value={formData.dio_id}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        )}

                        <div className="col-md-4">

                            <select
                                name="manpower_avl"
                                value={formData.manpower_avl}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="No">Manpower Available?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {formData.manpower_avl === 'Yes' && (
                            <>
                                <div className="col-md-4">

                                    <input
                                        name="mp_name"
                                        placeholder="Manpower Name"
                                        value={formData.mp_name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4">

                                    <input
                                        name="mp_post"
                                        placeholder="Manpower Post"
                                        value={formData.mp_post}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4">

                                    <input
                                        name="mp_contact_no"
                                        placeholder="Manpower Contact No"
                                        value={formData.mp_contact_no}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </>
                        )}


                        <div className="col-md-4">

                            <input
                                name="spc_name"
                                placeholder="SPC Name"
                                value={formData.spc_name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4">

                            <input
                                name="handling_officer"
                                placeholder="Handling Officer"
                                value={formData.handling_officer}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-4">

                            <input
                                name="contact_no"
                                placeholder="Contact No"
                                value={formData.contact_no}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-12">

                            <textarea
                                name="remarks"
                                placeholder="Remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className=" my-3 btn btn-success"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
