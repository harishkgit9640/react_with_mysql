import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Company Name</h5>
            <p className="text-light">
              Providing quality services and solutions for our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-light">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-light">About</Link>
              </li>
              <li className="mb-2">
                <Link to="/Career" className="text-decoration-none text-light">Career</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Street Name, City, Country
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                info@company.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +1 234 567 890
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12">
            <hr className="bg-light" />
            <p className="text-center text-light mb-0">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 