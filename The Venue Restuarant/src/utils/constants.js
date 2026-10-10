export const CATEGORIES = ['Lifestyle', 'Recipes', 'News', 'Events'];

export const STATUSES = ['published', 'draft'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first', field: 'createdAt', order: 'desc' },
  { value: 'oldest', label: 'Oldest first', field: 'createdAt', order: 'asc' },
  { value: 'title-asc', label: 'Title A - Z', field: 'title', order: 'asc' },
  { value: 'title-desc', label: 'Title Z - A', field: 'title', order: 'desc' },
];

export const LOCAL_IMAGES = [
  '/images/blog_1.jpg',
  '/images/blog_2.jpg',
  '/images/blog_3.jpg',
  '/images/blog_4.jpg',
  '/images/blog_5.jpg',
  '/images/blog_6.jpg',
];

export const PUBLIC_PAGE_SIZE = 6;
export const ADMIN_PAGE_SIZE = 8;
