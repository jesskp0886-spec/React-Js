import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { logout } from '../redux/actions/authActions';
import Avatar from './Avatar';

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <BsNavbar expand="lg" className="app-navbar" variant="dark" sticky="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <i className="bi bi-mortarboard-fill fs-4" />
          <span>Campus Desk</span>
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          {user ? (
            <>
              <Nav className="me-auto ms-lg-4">
                <Nav.Link as={NavLink} to="/" end>
                  <i className="bi bi-people me-2" />Students
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add">
                  <i className="bi bi-person-plus me-2" />Add student
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  <i className="bi bi-person-circle me-2" />Profile
                </Nav.Link>
              </Nav>
              <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                <div className="d-flex align-items-center gap-2 text-white">
                  <Avatar name={user.name} size={34} />
                  <span className="small fw-semibold">{user.name}</span>
                </div>
                <Button variant="outline-light" size="sm" onClick={handleSignOut}>
                  <i className="bi bi-box-arrow-right me-1" />Sign out
                </Button>
              </div>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
            </Nav>
          )}
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
