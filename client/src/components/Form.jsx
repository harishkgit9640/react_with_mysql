import React from 'react';

const Form = ({
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitStatus,
    fields,
    submitButtonText = 'Submit'
}) => {
    return (
        <form onSubmit={handleSubmit} noValidate>
            {submitStatus === 'success' && (
                <div className="alert alert-success" role="alert">
                    Form submitted successfully!
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="alert alert-danger" role="alert">
                    Something went wrong. Please try again.
                </div>
            )}

            {fields.map((field) => (
                <div className="mb-3" key={field.name}>
                    <label htmlFor={field.name} className="form-label">
                        {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                            id={field.name}
                            name={field.name}
                            rows={field.rows || 2}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                        />
                    ) : (
                        <input
                            type={field.type || 'text'}
                            className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                        />
                    )}
                    {errors[field.name] && (
                        <div className="invalid-feedback">{errors[field.name]}</div>
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                    </>
                ) : (
                    submitButtonText
                )}
            </button>
        </form>
    );
};

export default Form;