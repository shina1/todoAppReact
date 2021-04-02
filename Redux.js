function Redux () {
  //a function that creates a store
  const createStore = (reducer) =>{
    // 1. The state
    let state;

    //  for listeing to the state
    const listeners = [];
    // 2. get the state

    const getState = () => state;
    // subscription function for listening to changes in the state
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((el) => el !== listener);
      };
    };

    //for updating the state
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    };

    // returns an object that exposes the state
    return {
      getState,
      subscribe,
      dispatch,
    };
  },
};

export default Redux;
