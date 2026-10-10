import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/MenuPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Dashboard from './pages/admin/Dashboard';
import BlogEditor from './pages/admin/BlogEditor';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="admin" element={<Dashboard />} />
        <Route path="admin/blogs/new" element={<BlogEditor />} />
        <Route path="admin/blogs/:id/edit" element={<BlogEditor />} />
        <Route path="admin/blogs" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
