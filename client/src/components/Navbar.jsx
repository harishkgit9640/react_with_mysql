import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavDropdown, Image } from 'react-bootstrap';

function NavbarComponent() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin"


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to={isAuthenticated ? '/dashboard-overview' : '/'} className="navbar-brand">LOGO.</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {isAdmin && (<>
                  <Link to="/user-dashboard" className="nav-link">User Details</Link>
                  <Link to="/contact-management" className="nav-link">Contact Details</Link>
                </>)}
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contacts" className="nav-link">Contacts</Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <span>{user?.name || 'User'}</span>
                    <Image
                      // src={user?.profile_picture || '/default-avatar.png'}
                      src={`http://localhost:5000/${user.profile_picture}`}

                      alt={user?.name || 'User'}
                      roundedCircle
                      style={{ width: '32px', height: '32px', marginRight: '8px' }}
                    />
                  </div>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;