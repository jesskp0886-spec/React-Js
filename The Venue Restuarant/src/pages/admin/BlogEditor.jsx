import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePageStyles from '../../hooks/usePageStyles';
import { pageStyles } from '../../styles';
import PageHero from '../../components/layout/PageHero';
import BlogForm from '../../components/blog/BlogForm';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { clearCurrent, createBlog, fetchBlogById, updateBlog } from '../../features/blogs/blogsSlice';

// One page for both "add" (/admin/blogs/new) and "edit" (/admin/blogs/:id/edit).
export default function BlogEditor() {
  usePageStyles(pageStyles.blog);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current, currentStatus, saving, error } = useSelector((s) => s.blogs);

  useEffect(() => {
    if (isEdit) dispatch(fetchBlogById(id));
    return () => dispatch(clearCurrent());
  }, [dispatch, id, isEdit]);

  const handleSubmit = async (values) => {
    try {
      if (isEdit) await dispatch(updateBlog({ id, data: { ...current, ...values } })).unwrap();
      else await dispatch(createBlog(values)).unwrap();
      navigate('/admin');
    } catch {
      /* the error notice is shown by the slice; stay on the form */
    }
  };

  return (
    <>
      <PageHero
        image="/images/blog.jpg"
        subtitle="Admin"
        title={isEdit ? 'Edit post' : 'New post'}
      />
      <div className="blog_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Link to="/admin" className="back_link">
                &larr; Back to dashboard
              </Link>

              {isEdit && currentStatus === 'loading' && <Loader label="Loading post..." />}
              {isEdit && currentStatus === 'failed' && <ErrorMessage message={error} />}

              {(!isEdit || currentStatus === 'succeeded') && (
                <div className="editor_card">
                  <BlogForm
                    key={current?.id ?? 'new'}
                    initialValues={isEdit ? current : undefined}
                    onSubmit={handleSubmit}
                    submitting={saving}
                    submitLabel={isEdit ? 'Save changes' : 'Create post'}
                    onCancel={() => navigate('/admin')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
