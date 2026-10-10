import * as types from '../actions/actionTypes';
import { STORAGE_KEY } from '../actions/authActions';

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

const initialState = { user: loadUser(), loading: false, error: null };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case types.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.LOGOUT:
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
}
