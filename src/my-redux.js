// 创建store
export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  // 存放观察者
  const currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(cl => cl());
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    // clear
    return () => {
      console.log('GC');
      const idx = currentListeners.findIndex(item => item === listener);
      currentListeners.splice(idx, 1);
    };
  }
  dispatch({ type: '@INIT/MY-REDUX' });
  return {
    dispatch,
    getState,
    subscribe
  };
}

// 返回一个带中间件的增幅器
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    const midApi = {
      getState: store.getState,
      dispatch: store.dispatch
    };
    const chain = middlewares.map(mw => mw(midApi));
    const dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// 组合中间件 上一个中间件的返回 作为下一个中间件的入参
function compose(...funcs) {
  const len = funcs.length;
  if (len === 0) {
    return arg => arg;
  }
  if (len === 1) {
    return funcs[0];
  }
  return funcs.reduce((acc, cur) => (...args) => cur(acc(...args)));
}
