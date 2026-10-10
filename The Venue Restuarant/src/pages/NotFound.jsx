import { Link } from 'react-router-dom';
import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';

export default function NotFound() {
  usePageStyles(pageStyles.blog);
  return (
    <>
      <PageHero image="/images/blog.jpg" subtitle="Oops" title="Page not found" />
      <div className="blog_section text-center">
        <div className="container">
          <p className="mb-4">The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-venue">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
