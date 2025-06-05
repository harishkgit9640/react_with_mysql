import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Form from '../../components/Form';
import api from '../../services/api';
import { Card, Row, Col, Button, Image, Alert } from 'react-bootstrap';
import { validateImage, createImagePreview, uploadAvatar, cleanupPreview } from '../../utils/uploadAvatar';
import { FaCamera, FaCameraRetro, FaEdit, FaKey, FaUpload, FaUser } from 'react-icons/fa';
import ADD_PHOTO from '../../assets/Add-photo.png';



const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district_name: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const isAdmin = user?.role === "admin";


  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        district_name: user.district_name || ''
      }));
      setPreviewImage(user.profile_picture ? `http://localhost:5000/${user.profile_picture}` : ADD_PHOTO);
    }
  }, [user]);

  // Cleanup preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewImage) {
        cleanupPreview(previewImage);
      }
    };
  }, [previewImage]);

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
    if (showPasswordChange) {
      if (!formData.current_password) {
        newErrors.current_password = 'Current password is required';
      }
      if (formData.new_password) {
        if (formData.new_password.length < 6) {
          newErrors.new_password = 'Password must be at least 6 characters';
        }
        if (formData.new_password !== formData.confirm_password) {
          newErrors.confirm_password = 'Passwords do not match';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadError(null);

    // Validate the file
    const validationErrors = validateImage(file);
    if (validationErrors.length > 0) {
      setUploadError(validationErrors[0]);
      return;
    }

    // Create preview and set file
    const preview = createImagePreview(file);
    setSelectedFile(file);
    setPreviewImage(preview);
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;

    setUploadError(null);
    const result = await uploadAvatar(user.id, selectedFile);

    if (result.success) {
      // login(result.data); // Update user context with new data
      setSelectedFile(null);
    } else {
      setUploadError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.put('/auth/update-profile/' + user.id, formData);

      if (response.data.success) {
        setSubmitStatus('success');
        login(response.data.data);
        setIsEditing(false);
        setShowPasswordChange(false);
        // Reset password fields
        setFormData(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: ''
        }));
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
    }
  ];

  const passwordFields = [
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
        <Alert variant="warning" className="text-center">
          No user data found. Please log in.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">My Profile</h3>
          {isAdmin && <Button
            variant="light"
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) {
                setShowPasswordChange(false);
              }
            }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>}
        </Card.Header>
        <Card.Body>
          <Row>
            {/* Left Column - Profile Picture */}
            <Col md={4} className="text-center mb-4 mb-md-0">
              <div className="position-relative d-inline-block">
                <Image
                  src={user.profile_picture ? `http://localhost:5000/${user.profile_picture}` : ADD_PHOTO}
                  alt="Profile"
                  roundedCircle
                  fluid
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />


                <div className="mt-3">
                  <label
                    className="btn btn-outline-primary btn-sm"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaCamera size={18} />  Change Photo
                    <input
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <div className="mt-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleAvatarUpload}
                        disabled={!!uploadError}
                      >
                        <FaUpload /> Upload

                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-2"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewImage(user.profile_picture ? `http://localhost:5000/${user.profile_picture}` : null);
                          setUploadError(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  {uploadError && (
                    <div className="text-danger mt-2 small">{uploadError}</div>
                  )}
                </div>

              </div>
              {!isEditing && (
                <div className="mt-3">
                  <h5>{user.name}</h5>
                  <p className="text-muted mb-0">{user.role}</p>
                </div>
              )}
            </Col>

            {/* Right Column - Profile Details */}
            <Col md={8}>
              {isEditing ? (
                <>
                  <Form
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitStatus={submitStatus}
                    fields={[...profileFields, ...(showPasswordChange ? passwordFields : [])]}
                    submitButtonText="Update Profile"
                  />
                  <div className="mt-3">
                    {isAdmin && <Button
                      variant="outline-primary"
                      className="mb-3"
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                    >
                      <FaKey />
                      {showPasswordChange ? ' Hide Password Change' : ' Change Password'}
                    </Button>}
                  </div>
                </>
              ) : (
                <div className="profile-info">
                  <div className="mb-4">
                    <h5 className="text-muted mb-3">Personal Information</h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <p className="mb-1 text-muted">Email</p>
                        <p className="mb-0">{user.email}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1 text-muted">District</p>
                        <p className="mb-0">{user.district_name || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-muted mb-3">Account Information</h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <p className="mb-1 text-muted">Role</p>
                        <p className="mb-0">{user.role}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <p className="mb-1 text-muted">Member Since</p>
                        <p className="mb-0">{new Date(user.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;