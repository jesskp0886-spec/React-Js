import { useState } from 'react';
import { CATEGORIES, LOCAL_IMAGES } from '../../utils/constants';
import { validateBlog } from '../../utils/validators';

export const emptyBlog = {
  title: '',
  author: '',
  category: '',
  image: LOCAL_IMAGES[0],
  excerpt: '',
  content: '',
  status: 'draft',
};

// Reusable add/edit form with inline validation.
export default function BlogForm({ initialValues = emptyBlog, onSubmit, submitting, submitLabel, onCancel }) {
  const [values, setValues] = useState({ ...emptyBlog, ...initialValues });
  const [touched, setTouched] = useState({});

  const errors = validateBlog(values);
  const showError = (name) => touched[name] && errors[name];

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(Object.keys(emptyBlog).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    if (Object.keys(errors).length) return;
    onSubmit({
      ...values,
      title: values.title.trim(),
      author: values.author.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
      image: values.image.trim() || LOCAL_IMAGES[0],
    });
  };

  const field = (name) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    className: `form-control ${showError(name) ? 'is-invalid' : touched[name] ? 'is-valid' : ''}`,
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="field-title">Title</label>
        <input type="text" maxLength={120} {...field('title')} />
        <div className="invalid-feedback">{errors.title}</div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="field-author">Author</label>
          <input type="text" {...field('author')} />
          <div className="invalid-feedback">{errors.author}</div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="field-category">Category</label>
          <select {...field('category')}>
            <option value="">Choose...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.category}</div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="field-image">Image (URL or local path)</label>
        <input type="text" list="local-images" placeholder="/images/blog_1.jpg" {...field('image')} />
        <datalist id="local-images">
          {LOCAL_IMAGES.map((src) => (
            <option key={src} value={src} />
          ))}
        </datalist>
        <div className="invalid-feedback">{errors.image}</div>
        {values.image && !errors.image && (
          <img src={values.image} alt="Preview" className="form_preview mt-2" />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="field-excerpt">Summary</label>
        <textarea rows={2} {...field('excerpt')} />
        <small className="form-text text-muted">{values.excerpt.trim().length}/200 characters</small>
        <div className="invalid-feedback">{errors.excerpt}</div>
      </div>

      <div className="form-group">
        <label htmlFor="field-content">Content</label>
        <textarea rows={9} {...field('content')} />
        <small className="form-text text-muted">Leave a blank line between paragraphs.</small>
        <div className="invalid-feedback">{errors.content}</div>
      </div>

      <div className="form-group">
        <span className="d-block mb-1">Status</span>
        {['draft', 'published'].map((s) => (
          <div className="form-check form-check-inline" key={s}>
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id={`status-${s}`}
              value={s}
              checked={values.status === s}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor={`status-${s}`}>
              {s === 'draft' ? 'Draft' : 'Published'}
            </label>
          </div>
        ))}
      </div>

      <div className="d-flex">
        <button type="submit" className="btn btn-venue mr-2" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
