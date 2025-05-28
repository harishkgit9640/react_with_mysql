import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="bg-primary text-white py-5 my-4 rounded-3"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://img.freepik.com/premium-photo/gradient-powerpoint-background-corporate-presentation_167709-225.jpg?semt=ais_hybrid&w=740")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="h-100 d-flex align-items-center justify-content-center text-center">
          <div>
            <h1 className="display-4 fw-bold mb-3">About Our Project</h1>
            <p className="lead mb-0">A comprehensive project management solution for modern organizations</p>
          </div>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="py-5">
        <Card className="shadow">
          <Card.Body className="p-4">
            <div className="project-summary">
              <p className="lead mb-4">
                Welcome to our Project Management System, a comprehensive solution designed to streamline project administration, enhance team collaboration, and ensure successful project delivery.
              </p>
              
              <h5 className="mb-3">Key Features:</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>Project Management:</strong> Complete control over project lifecycle, from initiation to completion, with detailed tracking and reporting.
                    </li>
                    <li className="mb-3">
                      <strong>Team Collaboration:</strong> Enhanced team communication and task management with real-time updates and notifications.
                    </li>
                    <li className="mb-3">
                      <strong>Resource Management:</strong> Efficient allocation and tracking of resources, including team members, budget, and materials.
                    </li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>Task Tracking:</strong> Comprehensive task management with status updates, deadlines, and progress monitoring.
                    </li>
                    <li className="mb-3">
                      <strong>Document Management:</strong> Centralized storage and version control for project documents and files.
                    </li>
                    <li className="mb-3">
                      <strong>Reporting & Analytics:</strong> Detailed insights and analytics for project performance and resource utilization.
                    </li>
                  </ul>
                </Col>
              </Row>

              <h5 className="mb-3 mt-4">Technology Stack:</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">• Frontend: React.js with React Bootstrap</li>
                    <li className="mb-2">• Backend: Node.js with Express</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">• Database: MongoDB</li>
                    <li className="mb-2">• Authentication: JWT (JSON Web Tokens)</li>
                  </ul>
                </Col>
              </Row>

              <div className="mt-4 p-3 bg-light rounded">
                <p className="mb-0">
                  Our system is designed to empower teams and organizations to manage projects more effectively. With a focus on collaboration, efficiency, and real-time tracking, we help teams deliver successful projects on time and within budget. We continuously enhance our features to meet the evolving needs of modern project management.
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AboutUs; 