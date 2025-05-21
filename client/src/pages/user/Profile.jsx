import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Form from '../../components/Form';
import api from '../../services/api';

const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district_name: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
    profile_picture: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        district_name: user.district_name || ''
      }));
      setPreviewImage(user.profile_picture || null);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.new_password) {
      if (formData.new_password.length < 6) {
        newErrors.new_password = 'Password must be at least 6 characters';
      }
      if (formData.new_password !== formData.confirm_password) {
        newErrors.confirm_password = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profile_picture' && files[0]) {
      setFormData(prev => ({
        ...prev,
        profile_picture: files[0]
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await api.put('/user/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitStatus('success');
        login(response.data.data); // Update user context with new data
        setIsEditing(false);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors(error.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  const profileFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email'
    },
    {
      name: 'district_name',
      label: 'District',
      type: 'text',
      placeholder: 'Enter your district'
    },
    {
      name: 'current_password',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter current password'
    },
    {
      name: 'new_password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter new password'
    },
    {
      name: 'confirm_password',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm new password'
    }
  ];

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          No user data found. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">My Profile</h3>
              <button
                className="btn btn-light"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="fas fa-user-circle fa-6x text-secondary"></i>
                  )}
                  {isEditing && (
                    <label
                      className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-camera"></i>
                      <input
                        type="file"
                        name="profile_picture"
                        className="d-none"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              {isEditing ? (
                <Form
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitStatus={submitStatus}
                  fields={profileFields}
                  submitButtonText="Update Profile"
                />
              ) : (
                <div className="profile-info">
                  <h5 className="text-center mb-4">{user.name}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Email:</strong> {user.email}
                    </li>
                    <li className="list-group-item">
                      <strong>Role:</strong> {user.role}
                    </li>
                    <li className="list-group-item">
                      <strong>District:</strong> {user.district_name || 'Not specified'}
                    </li>
                    <li className="list-group-item">
                      <strong>Member Since:</strong>{' '}
                      {new Date(user.created_at).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;