import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 text-center">
                    <div className="error-template">
                        <h1 className="display-1 fw-bold text-primary">404</h1>
                        <h2 className="mb-4">Page Not Found</h2>
                        <div className="error-details mb-4">
                            Sorry, the page you are looking for might be in another universe.
                        </div>
                        <div className="error-actions">
                            <Link to="/" className="btn btn-primary btn-lg me-3">
                                <i className="fas fa-home me-2"></i>
                                Take Me Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-outline-secondary btn-lg"
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;