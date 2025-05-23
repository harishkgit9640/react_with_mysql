// AddProject.jsx
import React, { useState } from 'react';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.project_name || !formData.level || !formData.status) {
            alert('Please fill all required fields.');
            return;
        }
        console.log('Submitted Data:', formData);
        // You can handle actual form submission here (e.g., API call)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold">Add Project</h2>
            <input name="project_name" placeholder="Project Name" value={formData.project_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input name="project_url" placeholder="Project URL" value={formData.project_url} onChange={handleChange} className="w-full p-2 border rounded" />

            <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Level</option>
                <option value="Central">Central</option>
                <option value="State">State</option>
                <option value="District">District</option>
            </select>

            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>

            <select name="implemented_in_dist" value={formData.implemented_in_dist} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Implemented in District?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <input name="District" placeholder="District" value={formData.District} onChange={handleChange} className="w-full p-2 border rounded" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />

            <select name="dist_login_avl" value={formData.dist_login_avl} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="No">District Login Available?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            {formData.dist_login_avl === 'Yes' && (
                <>
                    <input name="nodal_office" placeholder="Nodal Office" value={formData.nodal_office} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="nodal_contact_no" placeholder="Nodal Contact No" value={formData.nodal_contact_no} onChange={handleChange} className="w-full p-2 border rounded" />
                </>
            )}

            <select name="dio_id_avl" value={formData.dio_id_avl} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="No">DIO ID Available?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            {formData.dio_id_avl === 'Yes' && (
                <input name="dio_id" placeholder="DIO ID" value={formData.dio_id} onChange={handleChange} className="w-full p-2 border rounded" />
            )}

            <select name="manpower_avl" value={formData.manpower_avl} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="No">Manpower Available?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            {formData.manpower_avl === 'Yes' && (
                <>
                    <input name="mp_name" placeholder="Manpower Name" value={formData.mp_name} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="mp_post" placeholder="Manpower Post" value={formData.mp_post} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="mp_contact_no" placeholder="Manpower Contact No" value={formData.mp_contact_no} onChange={handleChange} className="w-full p-2 border rounded" />
                </>
            )}

            <input name="spc_name" placeholder="SPC Name" value={formData.spc_name} onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="handling_officer" placeholder="Handling Officer" value={formData.handling_officer} onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="contact_no" placeholder="Contact No" value={formData.contact_no} onChange={handleChange} className="w-full p-2 border rounded" />
            <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} className="w-full p-2 border rounded" />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
    );
};

export default AddProject;
