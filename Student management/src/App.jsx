import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Profile from './components/Profile';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><StudentList /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
