import * as types from '../actions/actionTypes';

const initialState = { items: [], loading: false, error: null };

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_STUDENTS_SUCCESS:
      return { items: action.payload, loading: false, error: null };
    case types.FETCH_STUDENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.ADD_STUDENT_SUCCESS:
      return { ...state, items: [...state.items, action.payload], error: null };
    case types.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        items: state.items.map((s) => (s.id === action.payload.id ? action.payload : s)),
        error: null,
      };
    case types.DELETE_STUDENT_SUCCESS:
      return { ...state, items: state.items.filter((s) => s.id !== action.payload), error: null };

    case types.STUDENT_OPERATION_FAILURE:
      return { ...state, error: action.payload };
    case types.CLEAR_STUDENT_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
