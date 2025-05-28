import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavDropdown, Image } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import LOGO_URL from '../assets/LOGO_1.png';
import AVATAR_URL from '../assets/demo_avatar.webp';

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
        <Link to='/dashboard-overview' className="navbar-brand">
          <img src={LOGO_URL} alt="Logo" height={50} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuthenticated && <Link to="/home" className="nav-link fw-bold">Home</Link>}
            <Link to="/dashboard" className="nav-link fw-bold">Projects</Link>
            {isAdmin && isAuthenticated ? (
              <>
                <Link to="/user-dashboard" className="nav-link fw-bold">User Details</Link>
                <Link to="/contact-management" className="nav-link fw-bold">Contact Details</Link>
              </>

            ) : (
              <>
                <Link to="/about" className="nav-link fw-bold">About</Link>
                <Link to="/contacts" className="nav-link fw-bold">Contacts</Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <span className="me-2" >{user?.name || 'User'}</span>
                    <Image
                      // src={`http://localhost:5000/${user.profile_picture}`}
                      src={user.profile_picture ? `http://localhost:5000/${user.profile_picture}` : AVATAR_URL}

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
                  <FaUser className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="nav-link fw-bold">
                <FaSignInAlt className="me-2" /> Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;