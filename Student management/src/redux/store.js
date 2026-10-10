import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import studentReducer from './reducers/studentReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  students: studentReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
