import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('');

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await dispatch(login(email.trim(), password));
    if (ok) navigate(location.state?.from || '/', { replace: true });
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="text-center mb-4">
          <div className="login-icon"><i className="bi bi-mortarboard-fill" /></div>
          <h1 className="h3 fw-bold mb-1">Sign in to Campus Desk</h1>
          <p className="text-muted mb-0">Manage student records in one place.</p>
        </div>

        {error && <Alert variant="danger" className="py-2">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </Form.Group>
          <Form.Group className="mb-4" controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" className="me-2" /> : null}
            Sign in
          </Button>
        </Form>

        <p className="small text-muted text-center mt-4 mb-0">
          Demo account: admin@school.com / admin123
        </p>
      </div>
    </div>
  );
}
