import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { addStudent as addStudentThunk } from '../redux/actions/studentActions';
import Avatar from './Avatar';

const GRADES = ['A', 'B', 'C', 'D', 'F'];
const MAX_IMAGE_BYTES = 300 * 1024;

const EMPTY = { name: '', rollNo: '', phone: '', email: '', age: '', class: '', grade: 'A', image: '' };

export default function StudentForm({ initial, onSubmit, onCancel, submitLabel = 'Add student' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.items);

  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  const setField = (field) => (event) => setValues({ ...values, [field]: event.target.value });

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Enter the student’s full name.';
    if (!values.rollNo.toString().trim()) next.rollNo = 'Enter a roll number.';
    else if (
      students.some((s) => s.rollNo === values.rollNo.toString().trim() && s.id !== initial?.id)
    ) {
      next.rollNo = 'This roll number is already in use.';
    }
    if (!/^\d{10}$/.test(values.phone)) next.phone = 'Enter a 10-digit phone number.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address.';
    const age = Number(values.age);
    if (!age || age < 3 || age > 100) next.age = 'Enter an age between 3 and 100.';
    if (!values.class.trim()) next.class = 'Enter a class, for example 10-A.';
    return next;
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, image: 'Choose an image file.' });
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrors({ ...errors, image: 'Image must be smaller than 300 KB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setValues((v) => ({ ...v, image: reader.result }));
      setErrors((e) => ({ ...e, image: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const addStudent = async (student) => {
    await dispatch(addStudentThunk(student));
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    const student = {
      ...values,
      name: values.name.trim(),
      rollNo: values.rollNo.toString().trim(),
      email: values.email.trim(),
      class: values.class.trim(),
      age: Number(values.age),
    };

    setSaving(true);
    setServerError('');
    try {
      await (onSubmit ? onSubmit(student) : addStudent(student));
    } catch (error) {
      setServerError(error.message);
      setSaving(false);
    }
  };

  const form = (
    <Form noValidate onSubmit={handleSubmit}>
      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <div className="d-flex align-items-center gap-3 mb-4">
        <Avatar name={values.name} image={values.image} size={72} />
        <Form.Group controlId="student-image" className="flex-grow-1">
          <Form.Label className="mb-1">Photo</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImage} isInvalid={!!errors.image} />
          <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
        </Form.Group>
      </div>

      <Row className="g-3">
        <Col md={8}>
          <Form.Group controlId="student-name">
            <Form.Label>Full name</Form.Label>
            <Form.Control value={values.name} onChange={setField('name')} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="student-roll">
            <Form.Label>Roll number</Form.Label>
            <Form.Control value={values.rollNo} onChange={setField('rollNo')} isInvalid={!!errors.rollNo} />
            <Form.Control.Feedback type="invalid">{errors.rollNo}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="student-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={values.email} onChange={setField('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="student-phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control inputMode="numeric" maxLength={10} value={values.phone} onChange={setField('phone')} isInvalid={!!errors.phone} />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="student-age">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" value={values.age} onChange={setField('age')} isInvalid={!!errors.age} />
            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="student-class">
            <Form.Label>Class</Form.Label>
            <Form.Control placeholder="10-A" value={values.class} onChange={setField('class')} isInvalid={!!errors.class} />
            <Form.Control.Feedback type="invalid">{errors.class}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="student-grade">
            <Form.Label>Grade</Form.Label>
            <Form.Select value={values.grade} onChange={setField('grade')}>
              {GRADES.map((g) => <option key={g}>{g}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="light" onClick={onCancel || (() => navigate('/'))} disabled={saving}>Cancel</Button>
        <Button type="submit" disabled={saving}>
          {saving && <Spinner size="sm" className="me-2" />}
          {submitLabel}
        </Button>
      </div>
    </Form>
  );

  if (onSubmit) return form;

  return (
    <div className="mx-auto" style={{ maxWidth: 720 }}>
      <h1 className="page-title mb-1">Add a student</h1>
      <p className="text-muted mb-4">Fill in the details below to create a new record.</p>
      <div className="panel p-4">{form}</div>
    </div>
  );
}
