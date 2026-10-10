import { CATEGORIES, STATUSES } from './constants';

export const validateBlog = (values) => {
  const errors = {};
  const title = values.title.trim();
  const author = values.author.trim();
  const excerpt = values.excerpt.trim();
  const content = values.content.trim();
  const image = values.image.trim();

  if (!title) errors.title = 'Title is required.';
  else if (title.length < 5) errors.title = 'Title must be at least 5 characters.';
  else if (title.length > 100) errors.title = 'Title must be 100 characters or fewer.';

  if (!author) errors.author = 'Author is required.';
  else if (author.length < 2) errors.author = 'Author name must be at least 2 characters.';

  if (!CATEGORIES.includes(values.category)) errors.category = 'Please choose a category.';

  if (!excerpt) errors.excerpt = 'A short summary is required.';
  else if (excerpt.length < 20) errors.excerpt = 'Summary must be at least 20 characters.';
  else if (excerpt.length > 200) errors.excerpt = 'Summary must be 200 characters or fewer.';

  if (!content) errors.content = 'Content is required.';
  else if (content.length < 50) errors.content = 'Content must be at least 50 characters.';

  if (image && !/^(https?:\/\/|\/)\S+$/i.test(image)) {
    errors.image = 'Use a full URL (https://...) or a local path starting with /.';
  }

  if (!STATUSES.includes(values.status)) errors.status = 'Choose Draft or Published.';

  return errors;
};
