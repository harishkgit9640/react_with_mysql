import React, { useState } from 'react';
import Form from '../../components/Form';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
    // Clear error when user starts typing
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
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contacts/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Your Name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Your Email'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'Subject'
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Type your message here...'
    }
  ];

  return (
    <div className="container py-5">
      <div className="row">
        {/* Contact Information */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Contact Information</h3>
              <div className="mb-4">
                <h5 className="mb-3">Address</h5>
                <p className="mb-0">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                  National Informatics Centre<br />
                  Gaurela-pendra-marwahi<br />
                  Chhattisgarh
                </p>
              </div>
              <div className="mb-4">
                <h5 className="mb-3">Contact</h5>
                <p className="mb-2">
                  <i className="fas fa-phone me-2 text-primary"></i>
                  +91 9993426936
                </p>
                <p className="mb-0">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  dio-gpm-ct@nic.in
                </p>
              </div>
              <div>
                <h5 className="mb-3">Follow Us</h5>
                <div className="d-flex gap-3">
                  <a href="#" className="text-primary">
                    <i className="fab fa-facebook fa-lg"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Send Us a Message</h3>
              <Form
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                fields={contactFields}
                submitButtonText="Send Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
