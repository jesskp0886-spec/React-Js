import { api } from '../../api';
import * as types from './actionTypes';

export const STORAGE_KEY = 'sms_user';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  try {
    const query = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    const users = await api.get(`/users${query}`);
    if (users.length === 0) throw new Error('Incorrect email or password.');

    // Never keep the password in the store or in localStorage.
    const { password: _omit, ...user } = users[0];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    dispatch({ type: types.LOGIN_SUCCESS, payload: user });
    return true;
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  return { type: types.LOGOUT };
};
