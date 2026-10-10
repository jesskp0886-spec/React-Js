import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap';
import { fetchStudents, clearStudentError } from '../redux/actions/studentActions';
import StudentDetails from './StudentDetails';

export default function StudentList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.students);

  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = useMemo(() => [...new Set(items.map((s) => s.class))].sort(), [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter(
      (s) =>
        (classFilter === 'all' || s.class === classFilter) &&
        (gradeFilter === 'all' || s.grade === gradeFilter) &&
        (!q || s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q))
    );
    const direction = order === 'asc' ? 1 : -1;
    return [...filtered].sort(
      (a, b) =>
        direction *
        String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [items, query, classFilter, gradeFilter, sortBy, order]);

  const resetFilters = () => {
    setQuery('');
    setClassFilter('all');
    setGradeFilter('all');
  };

  const filtersActive = query || classFilter !== 'all' || gradeFilter !== 'all';

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <h1 className="page-title mb-1">Students</h1>
          <p className="text-muted mb-0">
            {items.length} enrolled across {classes.length} {classes.length === 1 ? 'class' : 'classes'}
          </p>
        </div>
        <Button as={Link} to="/add"><i className="bi bi-plus-lg me-2" />Add student</Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => dispatch(clearStudentError())}>
          {error}
        </Alert>
      )}

      <div className="panel p-3 mb-3">
        <Row className="g-2 align-items-center">
          <Col lg={4}>
            <InputGroup>
              <InputGroup.Text><i className="bi bi-search" /></InputGroup.Text>
              <Form.Control
                placeholder="Search by name or roll number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search students"
              />
            </InputGroup>
          </Col>
          <Col xs={6} lg={2}>
            <Form.Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} aria-label="Filter by class">
              <option value="all">All classes</option>
              {classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </Form.Select>
          </Col>
          <Col xs={6} lg={2}>
            <Form.Select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} aria-label="Filter by grade">
              <option value="all">All grades</option>
              {['A', 'B', 'C', 'D', 'F'].map((g) => <option key={g} value={g}>Grade {g}</option>)}
            </Form.Select>
          </Col>
          <Col xs={8} lg={3}>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
              <option value="name">Sort by name</option>
              <option value="rollNo">Sort by roll number</option>
            </Form.Select>
          </Col>
          <Col xs={4} lg={1}>
            <Button
              variant="light"
              className="w-100"
              onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
              aria-label={order === 'asc' ? 'Ascending order' : 'Descending order'}
              title={order === 'asc' ? 'Ascending' : 'Descending'}
            >
              <i className={`bi ${order === 'asc' ? 'bi-sort-down-alt' : 'bi-sort-up'}`} />
            </Button>
          </Col>
        </Row>
      </div>

      <div className="panel">
        {loading && items.length === 0 ? (
          <div className="text-center py-5"><Spinner /></div>
        ) : visible.length === 0 ? (
          <div className="text-center py-5 px-3">
            <i className="bi bi-person-x fs-1 text-muted" />
            <p className="fw-semibold mt-2 mb-1">
              {filtersActive ? 'No students match these filters.' : 'No students yet.'}
            </p>
            {filtersActive ? (
              <Button variant="link" onClick={resetFilters}>Clear filters</Button>
            ) : (
              <Button as={Link} to="/add" variant="link">Add the first student</Button>
            )}
          </div>
        ) : (
          <Table responsive hover className="student-table mb-0 align-middle">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll no.</th>
                <th>Class</th>
                <th className="d-none d-md-table-cell">Age</th>
                <th className="d-none d-lg-table-cell">Phone</th>
                <th>Grade</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visible.map((student) => (
                <StudentDetails key={student.id} student={student} />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}
