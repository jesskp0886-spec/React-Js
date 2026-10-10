import axiosClient from './axiosClient';

export const blogApi = {
  // json-server returns the total row count in the X-Total-Count header
  list: (params, signal) => axiosClient.get('/blogs', { params, signal }),
  get: (id) => axiosClient.get(`/blogs/${id}`),
  create: (data) => axiosClient.post('/blogs', data),
  update: (id, data) => axiosClient.put(`/blogs/${id}`, data),
  patch: (id, data) => axiosClient.patch(`/blogs/${id}`, data),
  remove: (id) => axiosClient.delete(`/blogs/${id}`),
  count: (params) => axiosClient.get('/blogs', { params: { ...params, _limit: 1 } }),
};
