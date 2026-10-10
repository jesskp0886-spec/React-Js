import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Badge } from 'react-bootstrap';
import {
  updateStudent as updateStudentThunk,
  deleteStudent as deleteStudentThunk,
} from '../redux/actions/studentActions';
import StudentForm from './StudentForm';
import Avatar from './Avatar';

const GRADE_COLOR = { A: 'success', B: 'primary', C: 'warning', D: 'danger', F: 'danger' };

export default function StudentDetails({ student }) {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateStudent = async (changes) => {
    await dispatch(updateStudentThunk(student.id, changes));
    setShowEdit(false);
  };

  const deleteStudent = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteStudentThunk(student.id));
    } catch {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <>
      <tr>
        <td>
          <div className="d-flex align-items-center gap-3">
            <Avatar name={student.name} image={student.image} size={42} />
            <div>
              <div className="fw-semibold">{student.name}</div>
              <div className="small text-muted">{student.email}</div>
            </div>
          </div>
        </td>
        <td>{student.rollNo}</td>
        <td>{student.class}</td>
        <td className="d-none d-md-table-cell">{student.age}</td>
        <td className="d-none d-lg-table-cell">{student.phone}</td>
        <td>
          <Badge bg={GRADE_COLOR[student.grade] || 'secondary'} className="grade-badge">{student.grade}</Badge>
        </td>
        <td className="text-end text-nowrap">
          <Button variant="light" size="sm" className="me-2" onClick={() => setShowEdit(true)} aria-label={`Edit ${student.name}`}>
            <i className="bi bi-pencil" />
          </Button>
          <Button variant="light" size="sm" className="text-danger" onClick={() => setShowDelete(true)} aria-label={`Delete ${student.name}`}>
            <i className="bi bi-trash" />
          </Button>
        </td>
      </tr>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit {student.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm
            initial={student}
            onSubmit={updateStudent}
            onCancel={() => setShowEdit(false)}
            submitLabel="Save changes"
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <strong>{student.name}</strong> (roll no. {student.rollNo})? This can’t be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowDelete(false)} disabled={deleting}>Cancel</Button>
          <Button variant="danger" onClick={deleteStudent} disabled={deleting}>Delete student</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
