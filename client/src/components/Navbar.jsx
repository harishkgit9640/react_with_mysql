import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavbarComponent() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
        <Link to="/" className="navbar-brand">LOGO.</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isAuthenticated && (
              <>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/add-project" className="nav-link">Add Project</Link>
                <Link to="/add-user" className="nav-link">Add User</Link>
              </>
            )}
            <Link to="/contacts" className="nav-link">Contacts</Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <span className="nav-link text-primary">
                  Welcome, {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;