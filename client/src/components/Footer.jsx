import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">NIC GPM</h5>
            <p className="text-light">
              Providing quality services and solutions for our employee.
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
                {/* <Link to="/Career" className="text-decoration-none text-light">Career</Link> */}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                National-Informatics-Centre,Gaurela-Pendra-Marwahi<br/>
                Chhattisgarh
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                dio-gpm-ct@nic.in
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +91 9993426936
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12">
            <hr className="bg-light" />
            <p className="text-center text-light mb-0">
              © {new Date().getFullYear()} <span className='text-primary'>Gaurela-Pendra-Marwahi,Chhattisgarh,Developed and hosted by National Informatic Center,gaurela-pendra-marwahi</span> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 