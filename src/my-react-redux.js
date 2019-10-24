import React, { useState, useContext, useEffect } from 'react';
import AppContext from './AppContext';

function connect(mapStateToProps = state => state, mapDispatchToProps = {}) {
  return Com => {
    return otherProps => {
      const store = useContext(AppContext);
      const getProps = () => {
        const stateProps = mapStateToProps(store.getState());
        const dispatchProps = bindCreators(mapDispatchToProps, store.dispatch);
        return {
          ...stateProps,
          ...dispatchProps,
          ...otherProps
        };
      };
      const [props, setProps] = useState({ ...getProps() });
      useEffect(
        () =>
          store.subscribe(() => {
            setProps({ ...getProps() });
          }),
        []
      );
      return <Com {...props}></Com>;
    };
  };
}

function bindCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
function bindCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, key) => {
    ret[key] = bindCreator(creators[key], dispatch);
    return ret;
  }, {});
}

const Provider = props => {
  return (
    <AppContext.Provider value={props.store}>
      {props.children}
    </AppContext.Provider>
  );
};

export { connect, Provider };
