// library code
// a function that creates a store
function createStore(reducer) {
  // 1. The state
  let state;

  //  for listeing to the state
  const listeners = [];
  // 2. get the state

  const getState = () => state;
  // function for listening to changes in the state
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
}

// variables
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// action creator
function add_todo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
function remove_todo(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}
function toggle_todo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}
function add_goal(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function remove_goal(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}
// App code, the reducer function

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}
// another reducer

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}
function checkAndDispatch(store, action) {
  if (
    action.type === ADD_TODO &&
    action.todos.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nope! that is a bad idea");
  }
  if (
    action.type === ADD_GOAL &&
    action.goals.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nope! that is a bad idea");
  }
  return store.dispatch(action);
}

const store = createStore(app);

store.subscribe(() => {
  console.log(`This is the state:`, store.getState());
});

checkAndDispatch(
  store,
  add_todo({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);

checkAndDispatch(
  store,
  toggle_todo({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);
checkAndDispatch(
  store,
  add_goal({
    id: 0,
    name: "Learn Redux",
  })
);
checkAndDispatch(store, remove_goal(0));
