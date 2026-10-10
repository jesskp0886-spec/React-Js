import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Notice from '../common/Notice';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  return (
    <div className="super_container">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <Notice />
    </div>
  );
}
