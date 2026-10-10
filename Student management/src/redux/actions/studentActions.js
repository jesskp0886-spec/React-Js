import { api } from '../../api';
import * as types from './actionTypes';

// ---- Plain action creators ----
const fetchRequest = () => ({ type: types.FETCH_STUDENTS_REQUEST });
const fetchSuccess = (students) => ({ type: types.FETCH_STUDENTS_SUCCESS, payload: students });
const fetchFailure = (message) => ({ type: types.FETCH_STUDENTS_FAILURE, payload: message });
const operationFailure = (message) => ({ type: types.STUDENT_OPERATION_FAILURE, payload: message });

export const clearStudentError = () => ({ type: types.CLEAR_STUDENT_ERROR });

// ---- Thunks (async operations) ----
export const fetchStudents = () => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    const students = await api.get('/students');
    dispatch(fetchSuccess(students));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const addStudent = (student) => async (dispatch) => {
  try {
    const created = await api.post('/students', student);
    dispatch({ type: types.ADD_STUDENT_SUCCESS, payload: created });
    return created;
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};

export const updateStudent = (id, changes) => async (dispatch) => {
  try {
    const updated = await api.put(`/students/${id}`, { ...changes, id });
    dispatch({ type: types.UPDATE_STUDENT_SUCCESS, payload: updated });
    return updated;
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await api.delete(`/students/${id}`);
    dispatch({ type: types.DELETE_STUDENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch(operationFailure(error.message));
    throw error;
  }
};
