import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { blogApi } from '../../api/blogApi';
import { SORT_OPTIONS, PUBLIC_PAGE_SIZE } from '../../utils/constants';

const errorMessage = (err) => err.friendlyMessage || err.message || 'Something went wrong.';
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const defaultFilters = {
  search: '',
  category: 'all',
  status: 'all',
  sort: 'newest',
  page: 1,
  limit: PUBLIC_PAGE_SIZE,
};

// Builds json-server query params from the filter state.
// scope "public" only ever returns published posts.
export const buildParams = (filters, scope) => {
  const sort = SORT_OPTIONS.find((s) => s.value === filters.sort) || SORT_OPTIONS[0];
  const params = {
    _page: filters.page,
    _limit: filters.limit,
    _sort: sort.field,
    _order: sort.order,
  };
  const search = filters.search.trim();
  if (search) params.title_like = escapeRegex(search);
  if (filters.category !== 'all') params.category = filters.category;
  if (scope === 'public') params.status = 'published';
  else if (filters.status !== 'all') params.status = filters.status;
  return params;
};

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (scope, { getState, rejectWithValue, signal }) => {
    try {
      const params = buildParams(getState().blogs.filters, scope);
      const res = await blogApi.list(params, signal);
      return { items: res.data, total: Number(res.headers['x-total-count'] ?? res.data.length) };
    } catch (err) {
      return rejectWithValue(errorMessage(err));
    }
  }
);

export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id, { rejectWithValue }) => {
  try {
    const res = await blogApi.get(id);
    return res.data;
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

export const fetchStats = createAsyncThunk('blogs/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const [all, published, draft] = await Promise.all([
      blogApi.count({}),
      blogApi.count({ status: 'published' }),
      blogApi.count({ status: 'draft' }),
    ]);
    const n = (r) => Number(r.headers['x-total-count'] ?? 0);
    return { total: n(all), published: n(published), draft: n(draft) };
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (data, { rejectWithValue }) => {
  try {
    const res = await blogApi.create({ ...data, createdAt: new Date().toISOString() });
    return res.data;
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await blogApi.update(id, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

export const toggleBlogStatus = createAsyncThunk('blogs/toggleStatus', async (blog, { rejectWithValue }) => {
  try {
    const status = blog.status === 'published' ? 'draft' : 'published';
    const res = await blogApi.patch(blog.id, { status });
    return res.data;
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
  try {
    await blogApi.remove(id);
    return id;
  } catch (err) {
    return rejectWithValue(errorMessage(err));
  }
});

const initialState = {
  items: [],
  total: 0,
  current: null,
  stats: { total: 0, published: 0, draft: 0 },
  filters: defaultFilters,
  listStatus: 'idle', // idle | loading | succeeded | failed
  currentStatus: 'idle',
  saving: false,
  error: null,
  notice: null, // { type: 'success' | 'danger', message }
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setFilters(state, action) {
      const changesPage = 'page' in action.payload;
      state.filters = { ...state.filters, ...action.payload };
      if (!changesPage) state.filters.page = 1; // any other change restarts at page 1
    },
    resetFilters(state, action) {
      state.filters = { ...defaultFilters, ...(action.payload || {}) };
      state.items = [];
      state.total = 0;
      state.listStatus = 'idle';
    },
    clearCurrent(state) {
      state.current = null;
      state.currentStatus = 'idle';
    },
    clearNotice(state) {
      state.notice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchBlogs.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.listStatus = 'succeeded';
        state.items = payload.items;
        state.total = payload.total;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        if (action.meta.aborted) return; // superseded by a newer request
        state.listStatus = 'failed';
        state.error = action.payload || action.error.message;
      })
      // single post
      .addCase(fetchBlogById.pending, (state) => {
        state.currentStatus = 'loading';
        state.current = null;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, { payload }) => {
        state.currentStatus = 'succeeded';
        state.current = payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.currentStatus = 'failed';
        state.error = action.payload || action.error.message;
      })
      // stats
      .addCase(fetchStats.fulfilled, (state, { payload }) => {
        state.stats = payload;
      })
      // create
      .addCase(createBlog.pending, (state) => {
        state.saving = true;
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.saving = false;
        state.notice = { type: 'success', message: 'Blog post created.' };
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.saving = false;
        state.notice = { type: 'danger', message: action.payload || 'Could not create the post.' };
      })
      // update
      .addCase(updateBlog.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.saving = false;
        state.notice = { type: 'success', message: 'Blog post updated.' };
        state.items = state.items.map((b) => (b.id === payload.id ? payload : b));
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.saving = false;
        state.notice = { type: 'danger', message: action.payload || 'Could not update the post.' };
      })
      // publish / draft toggle
      .addCase(toggleBlogStatus.fulfilled, (state, { payload }) => {
        state.items = state.items.map((b) => (b.id === payload.id ? payload : b));
        state.notice = {
          type: 'success',
          message: payload.status === 'published' ? 'Post published.' : 'Post moved to drafts.',
        };
      })
      .addCase(toggleBlogStatus.rejected, (state, action) => {
        state.notice = { type: 'danger', message: action.payload || 'Could not change the status.' };
      })
      // delete
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((b) => b.id !== payload);
        state.total = Math.max(0, state.total - 1);
        state.notice = { type: 'success', message: 'Blog post deleted.' };
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.notice = { type: 'danger', message: action.payload || 'Could not delete the post.' };
      });
  },
});

export const { setFilters, resetFilters, clearCurrent, clearNotice } = blogsSlice.actions;
export default blogsSlice.reducer;
