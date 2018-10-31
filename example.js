// import { createStore } from "redux"
import { createStore } from "./fakeRedux";

`
  createStore(reducer) 
  返回 store = {
    getState: func,
    subscribe: func,
    dispatch: func,
  }
`
`
Redux 最简单用例
store 中存储一个 count 用于计数，初始值为 0

store = {
    count: 0
}

通过 addOneCount 让 store 中 count 的值加一
`;
// action
const addOneCountString = "ADD_ONE_COUNT";

// action creator
const addOneCount = () => ({
  type: addOneCountString,
  payload: null
});

// thunk action creator
const addOneCountThunk = () => (getState, dispatch) => {
  setTimeout(() => {
    dispatch({
      type: addOneCountString,
      payload: null
    });
  }, 1000);
};

// reducer
function counter(
  state = {
    count: 0
  },
  action
) {
  switch (action.type) {
    case addOneCountString:
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const consoleActionMiddleWare1 = ({ getState, dispatch }) => next => action => {
  console.log("log action in middleware1", action);
  next(action);
};

const consoleActionMiddleWare2 = ({ getState, dispatch }) => next => action => {
  console.log("log action in middleware2", action);
  next(action);
};

const fakeReduxThunk = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(getState, dispatch);
  } else {
    next(action);
  }
};

let repeatTime = 3;
const repeatThroughMiddleWare = store => next => action => {
  console.log("repeatTime", repeatTime);
  if (repeatTime > 0) {
    repeatTime -= 1;
    store.dispatch(action);
  } else {
    next(action);
  }
};

// store
let store = createStore(counter, [
  consoleActionMiddleWare1,
  consoleActionMiddleWare2,
  fakeReduxThunk
]);

// let store = createStore(counter, [consoleActionMiddleWare1, consoleActionMiddleWare2] );

// console.log('inital state', store.getState());

store.subscribe(a => console.log("state updated", store.getState()));

store.dispatch(addOneCountThunk());
store.dispatch(addOneCount());
