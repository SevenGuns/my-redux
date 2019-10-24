import createStore, { applyMiddleware } from '../my-redux';

function getInitState() {
  return 'hehe2';
}

function userReducer(state = getInitState(), { type, payload }) {
  switch (type) {
    case 'login':
      return 'leien';
    case 'SAVE':
      return payload;
    default:
      return state;
  }
}
function logger({ dispatch, getState }) {
  return dispatch => action => {
    console.log(action.type, '执行了');
    return dispatch(action);
  };
}

function thunk({ dispatch, getState }) {
  return dispatch => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return dispatch(action);
  };
}

export default createStore(userReducer, applyMiddleware(logger, thunk));
