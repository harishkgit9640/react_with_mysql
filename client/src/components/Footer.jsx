import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import LOGO_URL from '../assets/footer-logo.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <img src={LOGO_URL} alt="Logo" height={100} />
            <p className="text-light mt-3">
              Providing quality services and solutions <br /> for our employee.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className="text-decoration-none text-light"
                >
                  Projects
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-light">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contacts"
                  className="text-decoration-none text-light"
                >
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard-overview"
                  className="text-decoration-none text-light"
                >
                  Terms & Condition{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-2">
                <FaLocationDot size={20} /> National-Informatics-Centre,Gaurela-Pendra-Marwahi <br />
                Chhattisgarh
              </li>
              <li className="mb-2">
                <FaEnvelope /> dio-gpm-ct@nic.in
              </li>
              <li className="mb-2">
                <FaPhone /> +91 9993426936
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12">
            <hr className="bg-light" />
            <p className="text-center text-light mb-0">
              © {new Date().getFullYear()}{" "}
              <span className="text-primary">
                Gaurela-Pendra-Marwahi,Chhattisgarh,Developed and hosted by
                National Informatic Center,gaurela-pendra-marwahi
              </span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
