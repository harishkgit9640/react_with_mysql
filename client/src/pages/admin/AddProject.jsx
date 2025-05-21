import React, { useState } from 'react';
import Form from '../../components/Form';

const AddProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        level: '',
        description: '',
        url: '',
        implemented_in_dist: '',
        dist_login_avl: '',
        nodal_office: '',
        nodal_contact_no: '',
        dio_id_avl: '',
        dio_id: '',
        manpower_avl: '',
        mp_name: '',
        mp_post: '',
        mp_contact_no: '',
        spc_name: '',
        handling_officer: '',
        contact_no: '',
        district_name: '',
        remarks: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.status.trim()) newErrors.status = 'Status is required';
        if (!formData.level.trim()) newErrors.level = 'Level is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({
                name: '', status: '', level: '', description: '', url: '',
                implemented_in_dist: '', dist_login_avl: '', nodal_office: '',
                nodal_contact_no: '', dio_id_avl: '', dio_id: '', manpower_avl: '',
                mp_name: '', mp_post: '', mp_contact_no: '', spc_name: '',
                handling_officer: '', contact_no: '', remarks: '', district_name: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Project Name', type: 'text', placeholder: 'Enter project name' },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
        { name: 'district_name', label: 'District Name', type: 'text', placeholder: 'District name' },
        { name: 'level', label: 'Project Level', type: 'select', options: ['Central', 'State', 'District'] },
        { name: 'description', label: 'Project Description', type: 'textarea', placeholder: 'Describe the project' },
        { name: 'url', label: 'URL', type: 'text', placeholder: 'Enter project URL' },
        { name: 'implemented_in_dist', label: 'Implemented in District', type: 'select', options: ['Yes', 'No'] },
        { name: 'dist_login_avl', label: 'District Login Available', type: 'select', options: ['Yes', 'No'] },
        { name: 'nodal_office', label: 'Nodal Office', type: 'text', placeholder: 'Nodal office name' },
        { name: 'nodal_contact_no', label: 'Nodal Office Contact No', type: 'text', placeholder: 'Contact number' },
        { name: 'dio_id_avl', label: 'DIO ID Available', type: 'select', options: ['Yes', 'No'] },
        { name: 'dio_id', label: 'DIO ID', type: 'text', placeholder: 'Enter DIO ID' },
        { name: 'manpower_avl', label: 'Manpower Available in District', type: 'select', options: ['Yes', 'No'] },
        { name: 'mp_name', label: 'Manpower Name', type: 'text', placeholder: 'Manpower name' },
        { name: 'mp_post', label: 'Manpower Post', type: 'text', placeholder: 'Manpower post' },
        { name: 'mp_contact_no', label: 'Manpower Contact No', type: 'text', placeholder: 'Contact number' },
        { name: 'spc_name', label: 'State Project Coordinator', type: 'text', placeholder: 'Coordinator name' },
        { name: 'handling_officer', label: 'Handling Officer', type: 'text', placeholder: 'Officer name' },
        { name: 'contact_no', label: 'Contact Number', type: 'text', placeholder: 'Contact number' },
        { name: 'remarks', label: 'Remarks', type: 'textarea', placeholder: 'Additional remarks' },
    ];

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Add New Project</h3>
                            <Form
                                formData={formData}
                                errors={errors}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                                submitStatus={submitStatus}
                                fields={fields}
                                submitButtonText="Submit Project"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
